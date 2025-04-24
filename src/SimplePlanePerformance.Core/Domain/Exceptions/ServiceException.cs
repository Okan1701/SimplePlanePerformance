using System.Runtime.Serialization;

namespace SimplePlanePerformance.Core.Domain.Exceptions;

public abstract class ServiceException : Exception
{
    protected ServiceException()
    {
    }

    protected ServiceException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    protected ServiceException(string? message) : base(message)
    {
    }

    protected ServiceException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}