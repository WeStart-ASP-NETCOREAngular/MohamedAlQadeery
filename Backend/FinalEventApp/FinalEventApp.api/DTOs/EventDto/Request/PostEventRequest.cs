using Mapster;
using System.ComponentModel.DataAnnotations;

namespace FinalEventApp.api.DTOs.EventDto.Request
{
    public class PostEventRequest
    {
        [Required]
        public string Name { get; set; }
        [Required]

        public string OwnerId { get; set; }
        [Required]

        public int? CategoryId { get; set; }
        [Required]


      
        public int[]? TagsId { get; set; }
    }  
    public class PutEventRequest
    {
        [Required]
        public string Name { get; set; }
       
        [Required]

        public int? CategoryId { get; set; }
      
        public int[]? TagsId { get; set; }
    }
}
