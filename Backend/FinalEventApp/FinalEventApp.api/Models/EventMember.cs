namespace FinalEventApp.api.Models
{
    public class EventMember
    {
        public string MemberId { get; set; }
        public AppUser Member { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
