namespace SimplePlanePerformance.Infrastructure.Adapters.Contracts;

public class Cloud
{
    public int? BaseFeetAgl { get; set; }
    public int? BaseMetersAgl { get; set; }
    public string? Code { get; set; }
    public string? Text { get; set; }
    public int? Feet { get; set; }
    public int? Meters { get; set; }
}