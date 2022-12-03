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

        public AccountController(UserManager<AppUser> userManager, IMapper mapper, ITokenService tokenService)
        {
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }


        /// <summary>
        /// Create new user and genrate jwt token if success 
        /// </summary>
        /// <param name="registerUserDto"></param>
        /// <returns>
        ///  Status code for the register with his token
        /// </returns>
        ///  <remarks>
        /// Sample request:
        ///
        ///     POST /Account/Register
        ///     {
        ///         "firstName" : "mohamed",
        ///         "lastName" : "testlastName",
        ///         "userName" :"MrMohamed",
        ///         "email" : "test@gmail.com",
        ///         "password":"222",
        ///         "confirmPassword" : "222"
        ///      }
        ///
        /// </remarks>
        /// <response code="200">User is registerd successfully and token genrated </response>
        /// <response code="400">User is not created there is errors that is send with the response </response>

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto registerUserDto)
        {
            var userToRegister = _mapper.Map<AppUser>(registerUserDto);

            var result = await _userManager.CreateAsync(userToRegister, registerUserDto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(new RegisterResponseDto
                {
                    Errors = errors,
                    RegisterationStatus = StatusCodes.Status400BadRequest
                });
            }

            await _userManager.AddToRoleAsync(userToRegister, "user");

            var token = await _tokenService.GenrateToken(userToRegister);
            var role = await _userManager.GetRolesAsync(userToRegister);



            return Ok(new RegisterResponseDto { RegisterationStatus = StatusCodes.Status200OK, Token = token,Username = userToRegister.UserName,Role = role.FirstOrDefault()  });
        }


        /// <summary>
        /// Login user using email and password
        /// </summary>
        /// <param name="loginUserDto"></param>
        /// <returns>
        ///  Status code 200 and genrated token for user 
        /// </returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Account/Login
        ///     {
        ///        
        ///         "email" : "test@gmail.com",
        ///         "password":"222",
        ///        
        ///      }
        ///
        /// </remarks>
        /// <response code="200">User is logged successfully and token genrated </response>
        /// <response code="400">User is not logged in and there is errors that is send with the response </response>



        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto loginUserDto)
        {
            var user = await _userManager.FindByEmailAsync(loginUserDto.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginUserDto.Password))
            {

                return BadRequest(new loginResponseDto
                {
                    loginStatus = StatusCodes.Status400BadRequest,
                    Error = "Email/password is wrong",
                    IsLoggedInSuccessfully = false
                });
            }

            var token = await _tokenService.GenrateToken(user);
            var role = await _userManager.GetRolesAsync(user);

            return Ok(new loginResponseDto
            {
                loginStatus = StatusCodes.Status200OK,
                IsLoggedInSuccessfully = true,
                Token = token,
                Username = user.UserName,
                Role = role.FirstOrDefault()


            }) ;

        }
    }
}
