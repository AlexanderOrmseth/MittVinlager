using API.Entities;
using API.Models;

namespace API.Interfaces;

public interface IUserService
{
    Task<User?> AuthenticateGoogleUserAsync(GoogleUserRequest request);
}