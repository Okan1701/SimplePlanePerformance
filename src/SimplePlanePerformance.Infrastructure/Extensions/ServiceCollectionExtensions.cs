using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimplePlanePerformance.Core.Ports;
using SimplePlanePerformance.Infrastructure.Adapters;
using SimplePlanePerformance.Infrastructure.Adapters.Options;

namespace SimplePlanePerformance.Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddCheckWxAdapter(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IMetarRepository, CheckWxMetarRepository>();
        services.Configure<CheckWxApiOptions>(configuration.GetSection(CheckWxApiOptions.Key));
    }
}