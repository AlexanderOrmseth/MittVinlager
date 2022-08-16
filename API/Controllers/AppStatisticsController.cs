using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[AllowAnonymous]
public class AppStatisticsController : BaseApiController
{
    private readonly IWineRepository _wineRepository;
    private readonly UserManager<User> _userManager;

    public AppStatisticsController(IWineRepository wineRepository, UserManager<User> userManager)
    {
        _wineRepository = wineRepository;
        _userManager = userManager;
    }


    [HttpGet]
    public async Task<object> GetWineCount(CancellationToken cancellationToken)
    {
        var wineCount = await _wineRepository.GetAllWineCount(cancellationToken);
        var userCount = await _userManager.Users.CountAsync(cancellationToken);

        return new {wineCount, userCount};
    }
}