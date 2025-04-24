using SimplePlanePerformance.Core.Domain.Entities;
using SimplePlanePerformance.Core.Domain.Enums;

namespace SimplePlanePerformance.Core.Services.DTO;

public class AircraftDto : EntityDto
{
    public required string Registration { get; set; }
    
    public required string Manufacturer { get; set; }
    
    public required string Model { get; set; }
    
    public AircraftType Type { get; set; }
    
    public FuelType FuelType { get; set; }
    
    public int? MaxLandingCrossWind { get; set; }
    
    public int? MaxLandingTailWind { get; set; }
    
    public int? MaxTakeoffTailWind { get; set; }
    
    public int? MaxTakeoffCrossWind { get; set; }

    public static AircraftDto FromAircraft(Aircraft aircraft) => new()
    {
        Registration = aircraft.Registration,
        Manufacturer = aircraft.Manufacturer,
        Model = aircraft.Model,
        Type = aircraft.Type,
        FuelType = aircraft.FuelType,
        MaxLandingCrossWind = aircraft.MaxLandingCrossWind,
        MaxLandingTailWind = aircraft.MaxLandingTailWind,
        MaxTakeoffTailWind = aircraft.MaxTakeoffTailWind,
        MaxTakeoffCrossWind = aircraft.MaxTakeoffCrossWind
    };
}