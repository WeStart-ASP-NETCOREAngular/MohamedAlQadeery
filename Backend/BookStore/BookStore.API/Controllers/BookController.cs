using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _repo;

        public BookController(IBookRepository repo)
        {
            _repo = repo;
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
        public async Task<IActionResult> CreateBook(Book bookToCreate)
        {
            var book = await _repo.CreateAsync(bookToCreate);

            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, Book bookToUpdate)
        {
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
