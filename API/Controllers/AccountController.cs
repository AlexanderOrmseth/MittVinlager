using System.Web;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Services;
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
    private readonly IEmailSender _emailSender;


    public AccountController(UserManager<User> userManager, TokenService tokenService, ImageService imageService,
        IConfiguration config, IEmailSender emailSender)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _imageService = imageService;
        _config = config;
        _emailSender = emailSender;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);

        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
            return Unauthorized(new ProblemDetails {Title = "Brukernavn eller passord er feil!"});

        return new UserDto
        {
            Email = user.Email,
            UserName = user.UserName,
            Token = await _tokenService.GenerateToken(user),
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        var user = new User {UserName = registerDto.Username, Email = registerDto.Email};

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        // email token
        var userFromDb = await _userManager.FindByEmailAsync(user.Email);
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        var uriBuilder = new UriBuilder(_config["ConfirmEmailPath"]);
        var query = HttpUtility.ParseQueryString(uriBuilder.Query);
        query["token"] = token;
        query["userid"] = userFromDb.Id.ToString();
        uriBuilder.Query = query.ToString();
        var urlString = uriBuilder.ToString();

        // also gotta limit number of emails sent...
        await _emailSender.SendEmailAsync(userFromDb.Email, userFromDb.UserName, urlString,
            "Confirm your email address");

        // add role
        await _userManager.AddToRoleAsync(user, "Member");


        return new UserDto
        {
            Email = user.Email,
            UserName = user.UserName,
            Token = await _tokenService.GenerateToken(user),
        };
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
            UserName = user.UserName,
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
}