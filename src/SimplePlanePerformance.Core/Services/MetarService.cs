using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimplePlanePerformance.Core.Data;
using SimplePlanePerformance.Core.Domain.Entities;
using SimplePlanePerformance.Core.Ports;
using SimplePlanePerformance.Core.Services.DTO;
using SimplePlanePerformance.Core.Services.Interfaces;

namespace SimplePlanePerformance.Core.Services;

public class MetarService : IMetarService
{
    private readonly SppDataContext _context;
    private readonly IMetarRepository _metarRepository;
    private readonly ILogger<MetarService> _logger;

    public MetarService(SppDataContext context, IMetarRepository metarRepository, ILogger<MetarService> logger)
    {
        _context = context;
        _metarRepository = metarRepository;
        _logger = logger;
    }

    public async Task<MetarDto> GetMetarByStationAsync(string station)
    {
        _logger.LogInformation("Retrieving METAR for station {Station}", station);
        var now = DateTime.Now;
        var stationUpper = station.ToUpper();
        
        var existingMetar = await _context.Metars
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Station == stationUpper);
        
        if (existingMetar == null)
        {
            _logger.LogInformation("No existing METAR data found for {Station}", station);
            var metar = await GetMetarExternally(stationUpper);
            return MetarDto.FromMetar(metar);
        }

        var existingMetarAge = now - existingMetar.CreatedDate;
        if (existingMetarAge.TotalMinutes > 15)
        {
            _logger.LogInformation("Existing METAR data for {Station} is outdated", station);
            _context.Metars.RemoveRange(_context.Metars.Where(x => x.Station == stationUpper));
            await _context.SaveChangesAsync();
            var metar = await GetMetarExternally(stationUpper);
            return MetarDto.FromMetar(metar);
        }
        
        var dto = MetarDto.FromMetar(existingMetar);
        dto.IsCachedResult = true;
        return dto;
    }

    private async Task<Metar> GetMetarExternally(string station)
    {
        var metar = await _metarRepository.GetByStationNameAsync(station);
        _context.Metars.Add(metar);
        await _context.SaveChangesAsync();
        _logger.LogInformation("New METAR data saved for {Station}", station);
        return metar;
    }
}