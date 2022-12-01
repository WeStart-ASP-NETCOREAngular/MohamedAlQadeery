namespace FinalEventApp.api.Models
{
    public class EventUser
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
