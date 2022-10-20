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

        public AuthController(IJwtTokenGenerator jwtToken)
        {
            _jwtToken = jwtToken;
        }

        [HttpGet]
        [Route("login")]
        public string Login()
        {
            var user = new IdentityUser
            {
                UserName = "mohamed",
                Email = "mohamed@gmail.com",
            };

            string token = _jwtToken.Generate(user);

            return token;

        }
    }
}
