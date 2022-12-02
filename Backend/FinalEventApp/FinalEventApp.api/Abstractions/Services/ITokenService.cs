using FinalEventApp.api.Models;

namespace FinalEventApp.api.Abstractions.Services
{
    public interface ITokenService
    {
        string GenrateToken(AppUser user);
    }
}
