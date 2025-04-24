using System.Text.Json.Serialization;

namespace SimplePlanePerformance.WebAPI.ViewModels;

public class ErrorResult
{
    public required string RequestId { get; set; }
    
    public required int StatusCode { get; set; }
    
    public required string Message { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? ExceptionName { get; set; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string[]? Errors { get; set; }
}