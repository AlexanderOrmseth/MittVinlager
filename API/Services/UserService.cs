using API.Entities;
using API.Interfaces;
using API.Models;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;

namespace API.Services;

public class UserService : IUserService
{
    protected readonly UserManager<User> _userManager;
    protected readonly IConfiguration _configuration;
    public UserService(UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }



    private async Task<User?> GetOrCreateExternalLoginUser(string provider, string key, string email, string firstName, string lastName)
    {
        var user = await _userManager.FindByLoginAsync(provider, key);
        if (user != null)
            return user;
        user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new User
            {
                Email = email,
                UserName = email,
            };
            await _userManager.CreateAsync(user);
        }

        var info = new UserLoginInfo(provider, key, provider.ToUpperInvariant());
        var result = await _userManager.AddLoginAsync(user, info);
        
        return result.Succeeded ? user : null;
    }

    public Task<User?> AuthenticateGoogleUserAsync(GoogleUserRequest request)
    {
        throw new NotImplementedException();
    }
}