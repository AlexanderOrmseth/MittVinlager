using System.Text.RegularExpressions;
using API.DTOs;
using API.Entities;
using API.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;
    private readonly ImageService _imageService;
    private readonly IConfiguration _config;

    public AccountController(UserManager<User> userManager, TokenService tokenService, ImageService imageService,
        IConfiguration config)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _imageService = imageService;
        _config = config;
    }


    [AllowAnonymous]
    [HttpPost("externalLogin")]
    public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
    {
        var payload = await VerifyGoogleToken(externalAuth);

        if (payload is null)
        {
            return BadRequest("Invalid External Authentication.");
        }

        var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
        Console.WriteLine("-------------");
        Console.WriteLine("-------------");
        Console.WriteLine(payload.Subject); //provider key
        Console.WriteLine("-------------");
        Console.WriteLine("-------------");
        
        // finds user based on Google ID
        var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        
        
        
        if (user == null)
        {
            // check if user already exists
            user = await _userManager.FindByEmailAsync(payload.Email);

            // if user doesnt exist create user
            if (user is null)
            {
                user = new User {Email = payload.Email, UserName = payload.Email};

                // Create new user
                await _userManager.CreateAsync(user);

                // Add role
                await _userManager.AddToRoleAsync(user, "Member");

                // Adds an external UserLoginInfo to the specified user.
                await _userManager.AddLoginAsync(user, info);
            }
            else
            {
                await _userManager.AddLoginAsync(user, info);
            }
        }
        
        // if user has changed email upsert here
        if (user.Email.Equals(payload.Email, StringComparison.OrdinalIgnoreCase))
        {
            //user has changed email
            
        }

        return Ok(new UserDto
        {
            Email = user.Email,
            UserName = MaskedEmail(user.Email),
            Token = await _tokenService.GenerateToken(user),
        });
    }

    private static string MaskedEmail(string email)
    {
        return Regex.Replace(email, @"(?<=[\w]{3})[\w-\._\+%]*(?=[\w]{0}@)", m => new string('*', m.Length));
    }

    /// <summary>
    /// Gets current logged in user
    /// </summary>
    /// <returns>Email, Username, Token</returns>
    [Authorize]
    [HttpGet("currentUser")]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);

        if (user is null)
        {
            return NotFound();
        }

        return new UserDto
        {
            Email = user.Email,
            UserName = MaskedEmail(user.Email),
            Token = await _tokenService.GenerateToken(user),
        };
    }

    /// <summary>
    /// Deletes user and all wine and images stored to that user.
    /// </summary>
    [Authorize]
    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);

        if (user is null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(user);

        // could not delete user
        if (!result.Succeeded) return BadRequest("Klarte ikke slette bruker");

        // delete all images
        await _imageService.DeleteAllUserImages(user.Id);
        return Ok();
    }


    /// <summary>
    /// Verify Google Access Token
    /// </summary>
    /// <param name="externalAuth"></param>
    /// <returns></returns>
    private async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleToken(ExternalAuthDto externalAuth)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new List<string> {_config.GetSection("Authentication:Google:clientId").Value}
            };
            var idToken = externalAuth.AccessToken;
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
            return payload;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}