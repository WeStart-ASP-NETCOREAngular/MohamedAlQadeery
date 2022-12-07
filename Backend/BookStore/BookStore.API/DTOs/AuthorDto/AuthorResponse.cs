using BookStore.API.DTOs.BookDto.Repsonse;
using Mapster;

namespace BookStore.API.DTOs.AuthorDto
{
    public class AuthorResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

       
    } 
    
    public class AuthorDeatilsResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<BookResponse> Books { get; set; }


    }
}
