namespace SimplePlanePerformance.Infrastructure.Adapters.Contracts;

public class CheckWxMetar
{
    public int Results { get; set; }
    
    public required ICollection<CheckWxMetarData> Data { get; set; }
}