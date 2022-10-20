using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Api.DTOs;
using PortfolioApp.Domain.Abstraction.Repositories;
using PortfolioApp.Domain.Models;

namespace PortfolioApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _repo;

        public PostController(IPostRepository repo)
        {
            _repo = repo;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            return Ok(await _repo.GetAllAsync());   
        }


        [HttpPost]
        public async Task<IActionResult> AddPost(CreatePostDto createPostDto)
        {
            var post = new Post { Title = createPostDto.Title,Body = createPostDto.Body};
            return Ok(await _repo.AddAsync(post));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            return Ok(await _repo.GetByIdAsync(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id ,UpdatePostDto updatePostDto)
        {
            var post = new Post { Title = updatePostDto.Title, Body = updatePostDto.Body };
            var isUpdated = await _repo.UpdateAsync(id,post);
            if (isUpdated) return Ok("Post has been updated");

            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePost(int id)
        {
            var isDeleted = await _repo.RemoveAsync(id);
            if (isDeleted) return Ok("Post has been deleted");
            return BadRequest();
        }


    }
}
