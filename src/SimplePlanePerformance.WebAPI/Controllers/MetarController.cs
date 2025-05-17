using Microsoft.AspNetCore.Mvc;
using SimplePlanePerformance.Core.Ports;

namespace SimplePlanePerformance.WebAPI.Controllers;

[ApiController]
[Route("/v1/metar")]
public class MetarController : ControllerBase
{
    private readonly IMetarRepository _metarRepository;

    public MetarController(IMetarRepository metarRepository)
    {
        _metarRepository = metarRepository;
    }

    [HttpGet("{station}")]
    public async Task<IActionResult> Get([FromRoute] string station)
    {
        var metar = await _metarRepository.GetByStationNameAsync(station);
        return Ok(metar);
    }
}