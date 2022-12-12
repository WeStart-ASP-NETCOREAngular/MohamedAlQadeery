namespace FinalEventApp.api.DTOs.EventDto.Response
{
    public class SingleEventResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public string OwnerId { get; set; }
        public CategoryResponseDto Category { get; set; }

        public List<TagResponseDto> Tags { get; set; }

        public string Image { get; set; }
        public string Description { get; set; }
        public string Time { get; set; }
        public string Location { get; set; }

        public DateTime StartDate { get; set; }

    }
    public class ListEventResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public string OwnerId { get; set; }
        public CategoryResponseDto Category { get; set; }

        public List<TagResponseDto> Tags { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Time { get; set; }
        public string Location { get; set; }

        public DateTime StartDate { get; set; }

    }
}
