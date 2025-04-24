using Microsoft.AspNetCore.Mvc;
using SimplePlanePerformance.Core.Domain.Entities;
using SimplePlanePerformance.Core.Services.DTO;
using SimplePlanePerformance.Core.Services.Interfaces;
using SimplePlanePerformance.WebAPI.ViewModels;

namespace SimplePlanePerformance.WebAPI.Controllers;

[ApiController]
[Route("/v1/aircraft")]
public class AircraftController : ControllerBase
{
    private readonly IAircraftService _aircraftService;

    public AircraftController(IAircraftService aircraftService)
    {
        _aircraftService = aircraftService;
    }

    [HttpGet]
    [ProducesResponseType<AircraftDto[]>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Get(CancellationToken cancellationToken)
    {
        var aircrafts = await _aircraftService.GetAllAircraftsAsync(cancellationToken);
        return Ok(aircrafts);
    }
    
    [HttpGet("{id}")]
    [ProducesResponseType<AircraftDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get([FromRoute] int id, CancellationToken cancellationToken)
    {
        var aircraft = await _aircraftService.GetAircraftByIdAsync(id, cancellationToken);
        return Ok(aircraft);
    }

    [HttpPost]
    [ProducesResponseType<AircraftDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Post(CreateAircraftDto aircraft, CancellationToken cancellationToken)
    {
        var result = await _aircraftService.CreateAircraftAsync(aircraft, cancellationToken);
        return Ok(result);
    }
    
    [HttpPut("{id}")]
    [ProducesResponseType<AircraftDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Put([FromRoute] int id, [FromBody] CreateAircraftDto aircraft, CancellationToken cancellationToken)
    {
        var updatedAircraft = await _aircraftService.UpdateAircraftAsync(id, aircraft, cancellationToken);
        return Ok(updatedAircraft);
    }
    
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status500InternalServerError)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status400BadRequest)]
    [ProducesResponseType<ErrorResult>(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken)
    {
        await _aircraftService.DeleteAircraftAsync(id, cancellationToken);
        return NoContent();
    }
}