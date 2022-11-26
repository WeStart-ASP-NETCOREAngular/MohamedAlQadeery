using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventWebApp.Domain.Models
{
    public class AppUser :IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? DeletedAt { get; set; } = null;

        public List<EventUser>? EventUsers { get; set; }
    }
}
