using System.Security.Claims;
using API.Context;
using API.DTOs;
using API.Entities;
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


    public AccountController(UserManager<User> userManager, TokenService tokenService, ImageService imageService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _imageService = imageService;
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
    public async Task<ActionResult> Register(RegisterDto registerDto)
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

        await _userManager.AddToRoleAsync(user, "Member");


        /*return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
            Gender = user.Gender
        };*/

        return StatusCode(201);
    }

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

    [Authorize]
    [HttpDelete]
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