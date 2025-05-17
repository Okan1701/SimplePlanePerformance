namespace SimplePlanePerformance.Infrastructure.Adapters.Options;

public class CheckWxApiOptions
{
    public const string Key = "CheckWxApiOptions";
    
    public required string BaseUrl { get; set; }
    
    public required string ApiKey { get; set; }
}