namespace SimplePlanePerformance.Core.Services.DTO;

public abstract class EntityDto
{
    public int Id { get; set; }
    
    public DateTime CreatedDate { get; set; }
    
    public DateTime ModifiedDate { get; set; }
}