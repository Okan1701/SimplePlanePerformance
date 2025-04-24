using System.ComponentModel.DataAnnotations;
using SimplePlanePerformance.Core.Domain.Entities;
using SimplePlanePerformance.Core.Domain.Enums;

namespace SimplePlanePerformance.Core.Services.DTO;

public class CreateAircraftDto
{
    [Required]
    public required string Registration { get; set; }
    
    [Required]
    public required string Manufacturer { get; set; }
    
    [Required]
    public required string Model { get; set; }
    
    [Required]
    public AircraftType Type { get; set; }
    
    [Required]
    public FuelType FuelType { get; set; }
    
    public int? MaxLandingCrossWind { get; set; }
    
    public int? MaxLandingTailWind { get; set; }
    
    public int? MaxTakeoffTailWind { get; set; }
    
    public int? MaxTakeoffCrossWind { get; set; }

    public Aircraft ToAircraftEntity() => new()
    {
        Registration = Registration,
        Manufacturer = Manufacturer,
        Model = Model,
        Type = Type,
        FuelType = FuelType,
        MaxLandingCrossWind = MaxLandingCrossWind,
        MaxLandingTailWind = MaxLandingTailWind,
        MaxTakeoffTailWind = MaxTakeoffTailWind,
        MaxTakeoffCrossWind = MaxTakeoffCrossWind,
    };

}