using System.ComponentModel.DataAnnotations.Schema;

namespace FinalEventApp.api.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? DeletedAt { get; set; } = null;

        public int CategoryId { get; set; }
        public Category Category { get; set; }



        [ForeignKey("Owner")]
        public string OwnerId { get; set; }
        public AppUser Owner { get; set; }

        public List<EventTag> Tags { get; set; }

        public List<EventMember> Members { get; set; }


    }
}
