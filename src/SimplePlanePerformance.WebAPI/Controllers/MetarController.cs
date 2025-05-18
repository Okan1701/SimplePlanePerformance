using Microsoft.AspNetCore.Mvc;
using SimplePlanePerformance.Core.Ports;
using SimplePlanePerformance.Core.Services.Interfaces;

namespace SimplePlanePerformance.WebAPI.Controllers;

[ApiController]
[Route("/v1/metar")]
public class MetarController : ControllerBase
{
    private readonly IMetarService _service;

    public MetarController(IMetarService service)
    {
        _service = service;
    }

    [HttpGet("{station}")]
    public async Task<IActionResult> Get([FromRoute] string station)
    {
        var metar = await _service.GetMetarByStationAsync(station);
        return Ok(metar);
    }
}