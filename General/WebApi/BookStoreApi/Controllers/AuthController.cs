using BookStoreApi.DTOs;
using BookStoreApi.services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IJwtTokenGenerator _jwtToken;
        private readonly UserManager<IdentityUser> _userManager;

        public AuthController(IJwtTokenGenerator jwtToken,UserManager<IdentityUser> userManager)
        {
            _jwtToken = jwtToken;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromForm]LoginDto loginDto)
        {
            var userExist = await _userManager.FindByNameAsync(loginDto.Username);
            if (userExist == null)
            {
                return BadRequest("Check your credenitls");
            }

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(userExist,loginDto.Password);

            if (!isPasswordCorrect) return BadRequest("Check your credenitls");


            return Ok(_jwtToken.Generate(userExist));
           

        

        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {
            var userExist = await _userManager.FindByNameAsync(registerDto.Username);
            if(userExist != null)
            {
                return BadRequest("Check your credenitls");
            }

            var user = new IdentityUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest("Something went wrong");

            }

            return Ok(new
            {
                Email = user.Email,
                Token = _jwtToken.Generate(user)
            });

        }
    }
}
