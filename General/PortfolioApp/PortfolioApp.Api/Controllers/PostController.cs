using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
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
        private readonly IStringLocalizer<PostController> _stringLocalizer;

        public PostController(IPostRepository repo,IStringLocalizer<PostController> stringLocalizer)
        {
            _repo = repo;
            _stringLocalizer = stringLocalizer;
        }

        /// <summary>
        ///   Gets all posts from database  
        /// </summary>
        /// <returns>a list of posts</returns>
     
        /// <response code="200">a list of books has been retreived successfully </response>
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var name = _stringLocalizer["name"];
            return Ok(new
            {
                posts = await _repo.GetAllAsync(),
                name = name.Value
            }); ;   
        }


        /// <summary>
        /// Add a new post
        /// </summary>
        /// <param name="createPostDto"></param>
        /// <returns>
        ///  returns a newly created post
        /// </returns>
        /// /// <remarks>
        /// Sample request:
        ///
        ///     POST /Post
        ///     { 
        ///        "title": "Harry Potter",
        ///        "body": "Part 4"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Post has been created successfully</response>
        /// <response code="400">There was validation error in post values </response>

        [HttpPost]
        public async Task<IActionResult> AddPost(CreatePostDto createPostDto)
        {
            var post = new Post { Title = createPostDto.Title,Body = createPostDto.Body};
            await _repo.AddAsync(post);
            return CreatedAtAction(nameof(GetPost), new {id=post.Id},post);
        }


        /// <summary>
        /// Gets a specfic post by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>
        ///  returns a post if its found
        /// </returns>
        /// <response code="200">Post is retrived successfully</response>
        /// <response code="404">Post is not found in our database</response>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _repo.GetByIdAsync(id);
            if (post == null) return NotFound();
            return Ok(post);
        }

        /// <summary>
        /// Update a specifc post by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatePostDto"></param>
        /// <returns>
        /// returns a post after being updated
        /// </returns>
          /// <response code="200">Post is updated successfully</response>
        /// <response code="400">Post is not updated id/validation error</response>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id ,UpdatePostDto updatePostDto)
        {
            var post = new Post { Title = updatePostDto.Title, Body = updatePostDto.Body };
            var isUpdated = await _repo.UpdateAsync(id,post);
            if (isUpdated) return Ok("Post has been updated");

            return BadRequest();
        }

        /// <summary>
        /// Delete a specfic post by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>
        ///  returns 200 status code
        /// </returns>
        /// <response code="200">Post is deleted successfully</response>
        /// <response code="400">Post is not deleted</response>
        [HttpDelete]
        public async Task<IActionResult> DeletePost(int id)
        {
            var isDeleted = await _repo.RemoveAsync(id);
            if (isDeleted) return Ok("Post has been deleted");
            return BadRequest();
        }


    }
}
