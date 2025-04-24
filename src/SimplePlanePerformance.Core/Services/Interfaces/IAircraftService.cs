using SimplePlanePerformance.Core.Domain.Entities;
using SimplePlanePerformance.Core.Services.DTO;

namespace SimplePlanePerformance.Core.Services.Interfaces;

public interface IAircraftService
{
    Task<ICollection<AircraftDto>> GetAllAircraftsAsync(CancellationToken cancellationToken = default);
    
    Task<AircraftDto> GetAircraftByIdAsync(int id, CancellationToken cancellationToken = default);
    
    Task<AircraftDto> CreateAircraftAsync(CreateAircraftDto aircraft, CancellationToken cancellationToken = default);
    
    Task<AircraftDto> UpdateAircraftAsync(int id, CreateAircraftDto aircraft, CancellationToken cancellationToken = default);
    
    Task DeleteAircraftAsync(int id, CancellationToken cancellationToken = default);
}