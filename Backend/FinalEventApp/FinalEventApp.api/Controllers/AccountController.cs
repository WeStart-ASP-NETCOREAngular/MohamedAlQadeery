using FinalEventApp.api.Abstractions.Services;
using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinalEventApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,IMapper mapper,ITokenService tokenService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUserDto)
        {
            var userToRegister = _mapper.Map<AppUser>(registerUserDto);

            var result = await _userManager.CreateAsync(userToRegister, registerUserDto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest( new RegisterResponseDto { Errors  =
                    errors,RegisterationStatus = StatusCodes.Status400BadRequest});
            }

            await _userManager.AddToRoleAsync(userToRegister,"user");

            var token = await _tokenService.GenrateToken(userToRegister);


            return Ok(new RegisterResponseDto { RegisterationStatus  = StatusCodes.Status200OK, Token= token});
        }
    }
}
