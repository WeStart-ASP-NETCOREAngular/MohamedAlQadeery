using EventWebApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Domain.Abstraction.Services
{
    public interface ITokenService
    {
        string GenrateToken(AppUser user);
    }
}
