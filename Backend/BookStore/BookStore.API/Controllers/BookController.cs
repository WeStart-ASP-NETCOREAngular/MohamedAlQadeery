using BookStore.API.DTOs.Book.Request;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repo;
        private readonly IMapper _mapper;

        public BookController(IBookRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllBooks()
        {
            return Ok(await _repo.GetAllBooksAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var book = await _repo.GetBookByIdAsync(id);
            if (book != null)
            {
                return Ok(book);
            }

            return NotFound();
        }


        [HttpPost]
        public async Task<IActionResult> CreateBook(CreateBookRequest createBookRequest)
        {

            var bookToCreate = _mapper.Map<Book>(createBookRequest);
            var book = await _repo.CreateAsync(bookToCreate);

            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, UpdateBookRequest updateBookRequest)
        {
            var bookToUpdate = _mapper.Map<Book>(updateBookRequest);
            var book = await _repo.UpdateAsync(id, bookToUpdate);
            if (book != null)
            {
                return Ok(book);
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
    }
}
