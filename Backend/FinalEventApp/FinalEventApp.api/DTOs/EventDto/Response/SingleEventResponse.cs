namespace FinalEventApp.api.DTOs.EventDto.Response
{
    public class SingleEventResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public string OwnerId { get; set; }
        public int CategoryId { get; set; }

        public int[] TagsId { get; set; }

    }
    public class ListEventResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public string OwnerId { get; set; }
        public int CategoryId { get; set; }


    }
}
