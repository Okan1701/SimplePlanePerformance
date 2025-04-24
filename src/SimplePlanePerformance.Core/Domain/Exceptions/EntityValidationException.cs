namespace SimplePlanePerformance.Core.Domain.Exceptions;

public class EntityValidationException : ServiceException
{
    public EntityValidationException(string message) : base(message)
    {
    }
}