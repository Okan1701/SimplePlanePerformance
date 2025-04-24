using SimplePlanePerformance.Core.Domain.Enums;

namespace SimplePlanePerformance.Core.Domain.Entities;

public class Aircraft : Entity
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
}