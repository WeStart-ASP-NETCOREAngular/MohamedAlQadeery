using BookStore.API.DTOs.BookDto.Repsonse;

namespace BookStore.API.DTOs.BookReviewsDto.Response
{
    public class PostPutBookReviewResponse
    {

        public int Id { get; set; }
        public string AppUserId { get; set; }

      

        public SpecficBookResponse Book { get; set; }

        
        public int Rate { get; set; }


        public string Comment { get; set; }
    }


    public class DisplayBookReviewResponse
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }

        public int Rate { get; set; }


        public string Comment { get; set; }

    }
}
