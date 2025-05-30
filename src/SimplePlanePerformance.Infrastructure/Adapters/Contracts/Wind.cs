using System.Text.Json.Serialization;

namespace SimplePlanePerformance.Infrastructure.Adapters.Contracts;

public class Wind
{
    [JsonPropertyName("degrees")]
    public int? Degrees { get; set; }
    
    [JsonPropertyName("speed_kph")]
    public int? SpeedKph { get; set; }
    
    [JsonPropertyName("speed_kts")]
    public int? SpeedKts { get; set; }
    
    [JsonPropertyName("speed_mph")]
    public int? SpeedMph { get; set; }
    
    [JsonPropertyName("speed_mps")]
    public int? SpeedMps { get; set; }
}