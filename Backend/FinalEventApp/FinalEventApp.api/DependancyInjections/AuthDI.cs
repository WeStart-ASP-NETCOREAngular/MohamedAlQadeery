using FinalEventApp.api.Abstractions.Services;
using FinalEventApp.api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FinalEventApp.api.DependancyInjections
{
    public static class AuthDI
    {
        public static IServiceCollection AddAuthenticationJWT(this IServiceCollection services, ConfigurationManager configuration)
        {

            services.AddScoped<ITokenService, TokenService>();


            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options => options.TokenValidationParameters =
                new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:ValidAudience"],
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secert"])),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,


                });
            return services;
        }
    }
}
