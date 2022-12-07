
using BookStore.API.DTOs.BookDto.Repsonse;
using BookStore.API.DTOs.BookDto.Request;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public BookController(IBookRepository repo,IMapper mapper,UserManager<AppUser> userManager)
        {
            _repo = repo;
            _mapper = mapper;
            _userManager = userManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _repo.GetAllBooksAsync();

            
            var booksResponse = _mapper.Map<List<BookResponse>>(books);
            return Ok(booksResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _repo.GetBookByIdAsync(id);
            if (book != null)
            {
                return Ok(_mapper.Map<BookDetailsResponse>(book));
            }

            return NotFound();
        }


        [HttpPost]
        public async Task<IActionResult> CreateBook(CreateBookRequest createBookRequest)
        {

            var bookToCreate = _mapper.Map<Book>(createBookRequest);
            var book = await _repo.CreateAsync(bookToCreate);

            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, _mapper.Map<BookResponse>(book));

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, UpdateBookRequest updateBookRequest)
        {
            var bookToUpdate = _mapper.Map<Book>(updateBookRequest);
            var book = await _repo.UpdateAsync(id, bookToUpdate);
            if (book != null)
            {
                return Ok(_mapper.Map<BookResponse>(book));
            }

            return NotFound();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var isDeleted = await _repo.DeleteAsync(id);
            if (isDeleted) return Ok();

            return BadRequest();
        }


        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestBook()
        {
            var book = await _repo.GetLatestBookAsync();
            if(book != null)
            {
                return Ok(_mapper.Map<SpecficBookResponse>(book));
            }

            return BadRequest();
        }


        [HttpGet("{bookId}/add-to-favorite")]
        public async Task<IActionResult> AddBookToFavorite(int bookId)
        {
            //Here we get Authenticted user 
            // this code is for testing purpose only until we implement authnetication
            var user = await _userManager.FindByIdAsync("b5feebcf-f317-4117-81c5-f95c98e3999e");
            
            var result = await _repo.AddToFavorite(user.Id,bookId);
            if (result)
            {
                return Ok("Book is added");
            }

            return BadRequest("ids are wrong or book is already added");
        }

         [HttpGet("{bookId}/remove-from-favorite")]
        public async Task<IActionResult> RemoveBookFromFavorite(int bookId)
        {
            //Here we get Authenticted user 
            // this code is for testing purpose only until we implement authnetication
            var user = await _userManager.FindByIdAsync("b5feebcf-f317-4117-81c5-f95c98e3999e");
            
            var result = await _repo.RemoveFromFavorite(user.Id,bookId);
            if (result)
            {
                return Ok("Book is removed from fav");
            }

            return BadRequest("ids are wrong or the record not in database");
        }


        [HttpGet("favorite-books")]
        public async Task<IActionResult> GetUserFavoriteBooks()
        {
            //Here we get Authenticted user 
            // this code is for testing purpose only until we implement authnetication
            var user = await _userManager.FindByIdAsync("b5feebcf-f317-4117-81c5-f95c98e3999e");

            var books = await _repo.GetUserFavoriteBooks(user.Id);

            return Ok(_mapper.Map<List<BookResponse>>(books));

        }


    }
}
