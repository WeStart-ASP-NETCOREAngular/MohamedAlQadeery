using FinalEventApp.api.Models;

namespace FinalEventApp.api.Abstractions.Services
{
    public interface ITokenService
    {
        Task<string> GenrateToken(AppUser user);
    }
}
