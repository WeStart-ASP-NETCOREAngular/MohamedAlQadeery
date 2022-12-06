using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _repo;

        public AuthorController(IAuthorRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAuthors()
        {
            return Ok(await _repo.GetAllAuthorsAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthorById(int id)
        {
            var author = await _repo.GetAuthorByIdAsync(id);
            if(author != null)
            {
                return Ok(author);
            }

            return NotFound();
        }


        [HttpPost]
        public async Task<IActionResult> CreateAuthor(Author authorToCreate)
        {
            var author = await _repo.CreateAsync(authorToCreate);

            return CreatedAtAction(nameof(GetAuthorById), new { id = author.Id }, author);
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuthor(int id , Author authorToUpdate)
        {
            var author = await _repo.UpdateAsync(id, authorToUpdate);
            if(author != null)
            {
                return Ok(author);
            }

            return NotFound();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var isDeleted = await _repo.DeleteAsync(id);
            if (isDeleted) return Ok();

            return BadRequest();
        }
    }
}
