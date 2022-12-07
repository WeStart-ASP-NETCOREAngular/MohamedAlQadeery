using BookStore.API.DTOs.AuthorDto;
using BookStore.API.DTOs.BookDto.Repsonse;
using BookStore.API.Models;
using Mapster;

namespace BookStore.API.Mapping
{
    public class BookMapConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Book, BookResponse>();
            //.Map(br => br.AuthorName, b => b.Author.Name)     
            //.Map(br => br.PublisherName, b => b.Publisher.Name)
            //.Map(br => br.TranslatorName, b => b.Translator.Name)
            //.Map(br => br.CategoryName, b => b.Category.Name);

                

            
               
                    
               
        }
    }
}
