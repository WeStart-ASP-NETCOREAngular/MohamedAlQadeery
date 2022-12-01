namespace FinalEventApp.api.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? DeletedAt { get; set; } = null;

        public List<EventTag>? EventTags { get; set; }
    }
}
