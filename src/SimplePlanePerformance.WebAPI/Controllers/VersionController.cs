using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using SimplePlanePerformance.WebAPI.ViewModels;

namespace SimplePlanePerformance.WebAPI.Controllers;

[ApiController]
[Route("/v1/version")]
public class VersionController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var assembly = Assembly.GetEntryAssembly();
        if (assembly == null) throw new NullReferenceException("Assembly is null");
        
        return Ok(new VersionModel
        {
            Major = assembly.GetName().Version?.Major ?? 0,
            Minor = assembly.GetName().Version?.Minor ?? 0,
            Build = assembly.GetName().Version?.Build ?? 0,
        });
    }
}