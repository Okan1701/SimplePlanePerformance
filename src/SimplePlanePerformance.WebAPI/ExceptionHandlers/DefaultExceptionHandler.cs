using Microsoft.AspNetCore.Diagnostics;
using SimplePlanePerformance.WebAPI.ViewModels;

namespace SimplePlanePerformance.WebAPI.ExceptionHandlers;

public class DefaultExceptionHandler : IExceptionHandler
{
    private readonly ILogger<DefaultExceptionHandler> _logger;

    public DefaultExceptionHandler(ILogger<DefaultExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Unhandled exception occured during HTTP request.");
        httpContext.Response.StatusCode = 500;
        await httpContext.Response.WriteAsJsonAsync(new ErrorResult
        {
            RequestId = httpContext.TraceIdentifier,
            Message = exception.Message,
            ExceptionName = exception.GetType().Name,
            StatusCode = 500
        }, cancellationToken: cancellationToken);
        
        return true;
    }
}