using FinalEventApp.api.Abstractions.Services;
using FinalEventApp.api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinalEventApp.api.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;

        public TokenService(IConfiguration configuration,UserManager<AppUser> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<string> GenrateToken(AppUser user)
        {
            // Claims
            List<Claim> claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id),
                new Claim(ClaimTypes.Name ,user.UserName),
                new Claim(ClaimTypes.Email , user.Email),
                
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            //SecretKey
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secert"]));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // token 
            var token = new JwtSecurityToken(
               issuer: _configuration["JWT:ValidIssuer"],
               audience: _configuration["JWT:ValidAudience"],
               claims: claims,
               expires: DateTime.Now.AddMinutes(120),
               signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
