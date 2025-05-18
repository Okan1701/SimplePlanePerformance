using System.Text.Json.Serialization;

namespace SimplePlanePerformance.Infrastructure.Adapters.Contracts;

using System;
using System.Collections.Generic;

public class CheckWxMetarData
{
    public string? Icao { get; set; }
    
    public Barometer? Barometer { get; set; }
    
    public Ceiling? Ceiling { get; set; }
    
    public List<Cloud>? Clouds { get; set; }
    
    public Dewpoint? Dewpoint { get; set; }
    
    public Elevation? Elevation { get; set; }
    
    [JsonPropertyName("flight_category")]
    public string? FlightCategory { get; set; }
    
    public Humidity? Humidity { get; set; }
    public DateTime? Observed { get; set; }
    public Station? Station { get; set; }
    
    public Temperature? Temperature { get; set; }
    
    [JsonPropertyName("raw_text")]
    public string? RawText { get; set; }
    
    public Visibility? Visibility { get; set; }
    
    public Wind? Wind { get; set; }
}