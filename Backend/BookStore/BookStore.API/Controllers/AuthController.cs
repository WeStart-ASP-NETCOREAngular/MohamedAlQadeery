using BookStore.API.DTOs.AppUserDto.Response;
using BookStore.API.DTOs.AuthenticationDto.Request;
using BookStore.API.Interfaces.Services;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AuthController(ITokenService tokenService, UserManager<AppUser> userManager, IMapper mapper)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {

            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, request.Password))
            {
                if (user.IsActive)
                {
                    var token = await _tokenService.Generate(user);
                    return Ok(token);
                }
                else
                    return Unauthorized(new { message = "unactive account, please contact administrator" });

            }
            else
                return Unauthorized(new { message = "تأكد من بريدك الالكتروني و كلمة المرور" });
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync(RegisterRequest request)
        {

            var userExists = await _userManager.FindByEmailAsync(request.Email);
            if (userExists != null)
            {
                return BadRequest(new { Errors = "هذا البريد الالكتروني مسجل مسبقا" });

            }

            var identityUser = _mapper.Map<AppUser>(request);

            var result = await _userManager.CreateAsync(identityUser, request.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description);
                return BadRequest(new { Errors = errors });
            }

            await _userManager.AddToRoleAsync(identityUser, "user");

            var token = await _tokenService.Generate(identityUser);

            return Ok(token);


        }


        [HttpGet("info")]
        [Authorize]
        public async Task<IActionResult> GetUserInfo()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            if(user == null)
            {
                return NotFound();
            }

            return Ok( _mapper.Map<InfoResponse>(user));

        }
        

    }
}
