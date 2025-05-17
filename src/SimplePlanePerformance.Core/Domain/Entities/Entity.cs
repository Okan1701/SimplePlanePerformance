namespace SimplePlanePerformance.Core.Domain.Entities;

public abstract class Entity
{
    public int Id { get; set; }
    
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    
    public DateTime ModifiedDate { get; set; } = DateTime.Now;
}