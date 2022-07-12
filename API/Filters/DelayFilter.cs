using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Filters;

public class DelayFilter : IAsyncActionFilter
{
    private readonly int _delayInMs;

    public DelayFilter(IConfiguration configuration)
    {
        _delayInMs = 800;
    }

    async Task IAsyncActionFilter.OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        await Task.Delay(_delayInMs);
        await next();
    }
}