using API.DTOs;
using API.Entities;
using API.Extensions;
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
    private readonly ILogger<AccountController> _logger;

    public AccountController(UserManager<User> userManager,
        TokenService tokenService, ImageService imageService,
        IConfiguration config, ILogger<AccountController> logger)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _imageService = imageService;
        _config = config;
        _logger = logger;
    }


    [AllowAnonymous]
    [HttpPost("externalLogin")]
    public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
    {
        var payload = await VerifyGoogleToken(externalAuth);

        if (payload is null)
        {
            return BadRequest(new ProblemDetails {Title = "Invalid External Authentication."});
        }

        var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

        // finds user based on Google ID
        var existingUser = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

        /*
         *  User already exists
         */

        if (existingUser is not null)
        {
            // return user by GOOGLE ID
            _logger.LogInformation("User exists with Id: {Id}", existingUser.Id);
            return Ok(new UserDto
            {
                DisplayName = existingUser.DisplayName,
                Token = await _tokenService.GenerateToken(existingUser),
            });
        }

        /*
         *  Create new user 
         */


        var newUserUserName = Guid.NewGuid().ToString();

        // paranoid check
        var paranoidCheck = await _userManager.FindByNameAsync(newUserUserName);
        if (paranoidCheck is not null)
        {
            return BadRequest(new ProblemDetails {Title = "Username is taken, please try again"});
        }

        // check out nameIdentifier CLAIM, add it to token?

        var newUser = new User {UserName = newUserUserName, DisplayName = payload.GivenName};

        // Create new user
        await _userManager.CreateAsync(newUser);
        _logger.LogInformation("Creating new user with Id: {Id}", newUser.Id);

        // Add role
        await _userManager.AddToRoleAsync(newUser, "Member");

        // Adds an external UserLoginInfo to the specified user.
        await _userManager.AddLoginAsync(newUser, info);


        // return created user
        return Ok(new UserDto
        {
            DisplayName = payload.Name,
            Token = await _tokenService.GenerateToken(newUser),
        });
    }

    [Authorize]
    [HttpPatch("displayName")]
    public async Task<ActionResult<string>> ChangeDisplayName([FromBody] DisplayNameDto displayNameDto)
    {
        // validate
        if (displayNameDto.DisplayName.IsNull() || displayNameDto.DisplayName.Length > 15 ||
            !displayNameDto.DisplayName.IsLetterOnly())
        {
            return BadRequest(new ProblemDetails {Title = "Error! Visningsnavnet er ugyldig"});
        }

        var user = await _userManager.FindByNameAsync(User.Identity?.Name);

        if (user is null)
        {
            return NotFound();
        }

        user.DisplayName = displayNameDto.DisplayName;

        var result = await _userManager.UpdateAsync(user);

        if (result.Succeeded)
        {
            return StatusCode(201);
        }

        return BadRequest(new ProblemDetails {Title = "Error, visningsnavn ble ikke endret."});
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
            DisplayName = user.DisplayName,
            Token = await _tokenService.GenerateToken(user),
            CreatedAt = user.CreatedAt
        };
    }

    /// <summary>
    /// Deletes user and all wine and images stored to that user.
    /// </summary>
    [Authorize]
    [HttpDelete("delete")]
    public async Task<ActionResult> DeleteUser(CancellationToken cancellationToken)
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