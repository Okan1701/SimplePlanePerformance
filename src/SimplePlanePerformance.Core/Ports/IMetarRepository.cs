using SimplePlanePerformance.Core.Domain.Entities;

namespace SimplePlanePerformance.Core.Ports;

/// <summary>
/// Interface for retrieving station METAR from outside source.
/// </summary>
public interface IMetarRepository
{
    /// <summary>
    /// Retrieves METAR for single station.
    /// </summary>
    /// <param name="stationName">ICAO designation of the station</param>
    /// <returns><see cref="Metar"/> object</returns>
    Task<Metar> GetByStationNameAsync(string stationName);
}