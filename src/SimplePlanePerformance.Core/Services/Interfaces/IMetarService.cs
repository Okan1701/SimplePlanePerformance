using SimplePlanePerformance.Core.Services.DTO;

namespace SimplePlanePerformance.Core.Services.Interfaces;

public interface IMetarService
{
    Task<MetarDto> GetMetarByStationAsync(string station);
}