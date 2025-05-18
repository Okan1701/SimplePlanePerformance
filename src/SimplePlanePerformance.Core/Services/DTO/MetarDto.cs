using SimplePlanePerformance.Core.Domain.Entities;

namespace SimplePlanePerformance.Core.Services.DTO;

public class MetarDto
{
    public required string Station { get; set; }
    
    public required string DisplayName { get; set; }
    
    public required string Category { get; set; }
    
    public DateTime Observed { get; set; }
    
    public int WindDirection { get; set; }
    
    public int WindSpeedKnots { get; set; }
    
    public double AltimeterPressureHpa { get; set; }
    
    public double AltimeterPressureHg { get; set; }
    
    public int CeilingFeet { get; set; }
    
    public required string RawMetar { get; set; }
    
    public bool IsCachedResult { get; set; }

    public static MetarDto FromMetar(Metar metar) => new MetarDto
    {
        Station = metar.Station,
        DisplayName = metar.DisplayName,
        Category = metar.Category,
        Observed = metar.Observed,
        WindDirection = metar.WindDirection,
        WindSpeedKnots = metar.WindSpeedKnots,
        AltimeterPressureHpa = metar.AltimeterPressureHpa,
        AltimeterPressureHg = metar.AltimeterPressureHg,
        CeilingFeet = metar.CeilingFeet,
        RawMetar = metar.RawMetar,
    };
}