using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Scalar.AspNetCore;
using SimplePlanePerformance.Core.Data;
using SimplePlanePerformance.Core.Services;
using SimplePlanePerformance.Core.Services.Interfaces;
using SimplePlanePerformance.Infrastructure.Extensions;
using SimplePlanePerformance.WebAPI.ExceptionHandlers;

namespace SimplePlanePerformance.WebAPI;

public static class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        if (OperatingSystem.IsWindows())
        {
#pragma warning disable CA1416
            builder.Logging.AddEventLog(options =>
            {
                options.LogName = "SimplePlanePerformance";
                options.SourceName = "SimplePlanePerformance.WebAPI";
            });
#pragma warning restore CA1416
        }

        // Add services to the container.
        builder.Services.AddHttpClient();
        builder.Services.AddControllers();
        builder.Services.AddAuthorization();
        builder.Services.AddDbContext<SppDataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MssqlConnection")));
        builder.Services.AddScoped<IAircraftService, AircraftService>();
        builder.Services.AddScoped<IMetarService, MetarService>();
        builder.Services.AddCheckWxAdapter(builder.Configuration);

        // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
        builder.Services.AddOpenApi();
        
        // Configure CORS
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        });

        // Add Exception handling
        builder.Services.AddExceptionHandler<NotFoundExceptionHandler>();
        builder.Services.AddExceptionHandler<ValidationExceptionHandler>();
        builder.Services.AddExceptionHandler<DefaultExceptionHandler>();
        builder.Services.AddProblemDetails();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        app.UseCors();
        app.MapControllers();
        app.UseExceptionHandler();
        app.UseHttpsRedirection();
        app.UseAuthorization();
        
        app.Run();
    }
}