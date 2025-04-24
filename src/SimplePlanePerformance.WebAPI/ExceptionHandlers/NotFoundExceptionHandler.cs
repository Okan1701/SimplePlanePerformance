using Microsoft.AspNetCore.Diagnostics;
using SimplePlanePerformance.Core.Domain.Exceptions;
using SimplePlanePerformance.WebAPI.ViewModels;

namespace SimplePlanePerformance.WebAPI.ExceptionHandlers;

public class NotFoundExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is EntityNotFoundException)
        {
            httpContext.Response.StatusCode = 404;
            await httpContext.Response.WriteAsJsonAsync(new ErrorResult
            {
                RequestId = httpContext.TraceIdentifier,
                Message = "The requested resource was not found.",
                StatusCode = 404
            }, cancellationToken: cancellationToken);

            return true;
        }

        return false;
    }
}