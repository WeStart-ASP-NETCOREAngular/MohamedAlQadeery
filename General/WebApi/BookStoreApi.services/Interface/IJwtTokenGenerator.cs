using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStoreApi.services.Interface
{
    public interface IJwtTokenGenerator
    {
       string Generate(IdentityUser user);
    }
}
