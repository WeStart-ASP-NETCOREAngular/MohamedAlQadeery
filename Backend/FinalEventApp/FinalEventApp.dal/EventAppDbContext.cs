


using FinalEventApp.api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace FinalEventApp.dal
{
    public class EventAppDbContext :IdentityDbContext<AppUser>
    {
    }
}
