using System.Net;
using System.Net.Http.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SimplePlanePerformance.Core.Domain.Entities;
using SimplePlanePerformance.Core.Domain.Exceptions;
using SimplePlanePerformance.Core.Ports;
using SimplePlanePerformance.Infrastructure.Adapters.Contracts;
using SimplePlanePerformance.Infrastructure.Adapters.Options;

namespace SimplePlanePerformance.Infrastructure.Adapters;

public class CheckWxMetarRepository : IMetarRepository
{
    private readonly CheckWxApiOptions _options;
    private readonly IHttpClientFactory _httpClientFactory;
    private ILogger<CheckWxMetarRepository> _logger;

    public CheckWxMetarRepository(IOptions<CheckWxApiOptions> options, IHttpClientFactory httpClientFactory, ILogger<CheckWxMetarRepository> logger)
    {
        _httpClientFactory = httpClientFactory;
        _logger = logger;
        _options = options.Value;
    }

    public async Task<Metar> GetByStationNameAsync(string stationName)
    {
        var correlationId = Guid.NewGuid();
        var url = $"{_options.BaseUrl}/metar/{stationName}/decoded";
        using var logScope = _logger.BeginScope(new Dictionary<string, object>
        {
            { "CorrelationId", correlationId }, 
            { "StationName", stationName },
            { "ApiRequestUrl", url }
        });
        _logger.LogInformation("Retrieving METAR for station {Station}", stationName);
        
        using var httpClient = _httpClientFactory.CreateClient();
        httpClient.DefaultRequestHeaders.Add("X-Api-Key", _options.ApiKey);
        var response = await httpClient.GetAsync(url);

        if (response.StatusCode == HttpStatusCode.NotFound)
        {
            _logger.LogInformation("Station {Station} was not found", stationName);
            throw new EntityNotFoundException();
        }
        
        if (!response.IsSuccessStatusCode)
        {
            _logger.LogError("Retrieving METAR failed with status code {Stat-usCode}", response.StatusCode);
            throw new RepositoryException();
        }

        var metarResponse = await response.Content.ReadFromJsonAsync<CheckWxMetar>();

        if (metarResponse == null)
        {
            _logger.LogError("Failed to deserialize JSON");
            throw new RepositoryException();
        }
        
        if (metarResponse?.Results <= 0)
        {
            _logger.LogInformation("Station {Station} was found, but contains no data", stationName);
            throw new EntityNotFoundException();
        }
        
        return new Metar
        {
            Station = stationName,
            Category = metarResponse?.Data.First().FlightCategory ?? string.Empty,
            DisplayName = metarResponse?.Data.First().Station?.Name ?? string.Empty,
            WindDirection = metarResponse?.Data.First().Wind?.Degrees ?? 0,
            WindSpeedKnots = metarResponse?.Data.First().Wind?.SpeedKts ?? 0,
            Observed = metarResponse?.Data.First().Observed ?? DateTime.UtcNow,
            AltimeterPressureHg = metarResponse?.Data.First().Barometer?.Hg ?? 0,
            AltimeterPressureHpa = metarResponse?.Data.First().Barometer?.Hpa ?? 0,
            CeilingFeet = metarResponse?.Data.First().Ceiling?.Feet ?? 0,
            RawMetar = metarResponse?.Data.First().RawText ?? string.Empty,
            CreatedDate = DateTime.Now,
            ModifiedDate = DateTime.Now,
        };
    }
}