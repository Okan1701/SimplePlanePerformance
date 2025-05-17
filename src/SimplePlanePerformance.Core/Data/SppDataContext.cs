using Microsoft.EntityFrameworkCore;
using SimplePlanePerformance.Core.Domain.Entities;

namespace SimplePlanePerformance.Core.Data;

public class SppDataContext : DbContext
{
    public DbSet<Aircraft> Aircraft { get; set; }
    
    public DbSet<Metar> Metars { get; set; }

    public SppDataContext(DbContextOptions options) : base(options)
    {
    }
}