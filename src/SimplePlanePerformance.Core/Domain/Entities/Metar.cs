using System.ComponentModel.DataAnnotations;

namespace SimplePlanePerformance.Core.Domain.Entities;

public class Metar : Entity
{
    [MaxLength(8)]
    public required string Station { get; set; }
    
    [MaxLength(256)]
    public required string DisplayName { get; set; }
    
    [MaxLength(256)]
    public required string Category { get; set; }
    
    public DateTime Observed { get; set; }
    
    public int WindDirection { get; set; }
    
    public int WindSpeedKnots { get; set; }
    
    public double AltimeterPressureHpa { get; set; }
    
    public double AltimeterPressureHg { get; set; }
    
    public int CeilingFeet { get; set; }
    
    [MaxLength(1024)]
    public required string RawMetar { get; set; }
}