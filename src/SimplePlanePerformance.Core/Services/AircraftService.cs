using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SimplePlanePerformance.Core.Data;
using SimplePlanePerformance.Core.Domain.Entities;
using SimplePlanePerformance.Core.Domain.Exceptions;
using SimplePlanePerformance.Core.Services.DTO;
using SimplePlanePerformance.Core.Services.Interfaces;

namespace SimplePlanePerformance.Core.Services;

public class AircraftService : IAircraftService
{
    private readonly SppDataContext _context;
    private readonly ILogger<AircraftService> _logger;

    public AircraftService(SppDataContext context, ILogger<AircraftService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<ICollection<AircraftDto>> GetAllAircraftsAsync(CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Retrieving all aircraft");
        var aircraft = await _context.Aircrafts
            .ToArrayAsync(cancellationToken);

        return aircraft.Select(AircraftDto.FromAircraft).ToArray();
    }

    public async Task<AircraftDto> GetAircraftByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Retrieving aircraft by ID {Id}", id);
        
        var entity = await _context.Aircrafts.FindAsync(id, cancellationToken);

        if (entity == null)
        {
            throw new EntityNotFoundException();
        }
        
        return AircraftDto.FromAircraft(entity);
    }

    public async Task<AircraftDto> CreateAircraftAsync(CreateAircraftDto newAircraft, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Creating new aircraft");
        var aircraft = newAircraft.ToAircraftEntity();
        aircraft.CreatedDate = DateTime.Now;
        aircraft.ModifiedDate = DateTime.Now;
        ValidateEntity(aircraft);
        _context.Aircrafts.Add(aircraft);
        await _context.SaveChangesAsync(cancellationToken);
        return AircraftDto.FromAircraft(aircraft);
    }

    public async Task<AircraftDto> UpdateAircraftAsync(int id, CreateAircraftDto aircraft, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Updating aircraft by ID {Id}", id);
        var entity = await _context.Aircrafts.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (entity == null)
        {
            throw new EntityNotFoundException();
        }

        var updatedEntity = aircraft.ToAircraftEntity();
        updatedEntity.Id = entity.Id;
        updatedEntity.ModifiedDate = DateTime.Now;
        updatedEntity.CreatedDate = entity.CreatedDate;
        ValidateEntity(updatedEntity);
        _context.Aircrafts.Update(updatedEntity);
        await _context.SaveChangesAsync(cancellationToken);
        return AircraftDto.FromAircraft(updatedEntity);
    }

    public async Task DeleteAircraftAsync(int id, CancellationToken cancellationToken = default)
    {
        _logger.LogInformation("Deleting aircraft by ID {Id}", id);
        var entity = await _context.Aircrafts.FindAsync(id, cancellationToken);

        if (entity == null)
        {
            throw new EntityNotFoundException();
        }
        
        _context.Aircrafts.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private static void ValidateEntity(Aircraft aircraft)
    {
        if (aircraft is null)
        {
            throw new EntityValidationException("Aircraft cannot be null");
        }

        if (string.IsNullOrWhiteSpace(aircraft.Registration))
        {
            throw new EntityValidationException("Registration cannot be empty");
        }
        
        if (string.IsNullOrWhiteSpace(aircraft.Model))
        {
            throw new EntityValidationException("Model cannot be empty");
        }
    }
}