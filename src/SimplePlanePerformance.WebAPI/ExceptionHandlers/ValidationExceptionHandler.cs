using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Diagnostics;
using SimplePlanePerformance.Core.Domain.Exceptions;
using SimplePlanePerformance.WebAPI.ViewModels;

namespace SimplePlanePerformance.WebAPI.ExceptionHandlers;

public class ValidationExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is EntityValidationException validationException)
        {
            httpContext.Response.StatusCode = 400;
            await httpContext.Response.WriteAsJsonAsync(new ErrorResult
            {
                RequestId = httpContext.TraceIdentifier,
                Message = "The payload contains invalid elements.",
                StatusCode = 400,
                Errors = [validationException.Message]
            }, cancellationToken: cancellationToken);

            return true;
        }

        return false;
    }
}