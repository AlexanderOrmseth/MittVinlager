using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Filters;

public class DelayFilter : IAsyncActionFilter
{
    private const int DelayInMs = 100;

    async Task IAsyncActionFilter.OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        await Task.Delay(DelayInMs);
        await next();
    }
}