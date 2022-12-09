using Microsoft.AspNetCore.Identity;

namespace FinalEventApp.api.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime? DeletedAt { get; set; } = null;

        public List<EventMember> JoinedEvents { get; set; }

        public List<Event> CreatedEvents { get; set; }

    }
}
