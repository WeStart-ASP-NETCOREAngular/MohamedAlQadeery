using EventWebApp.Contracts.DTOs.Category;
using EventWebApp.Domain.Abstraction.Repositories;
using EventWebApp.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        /// <summary>
        /// Get All Categories from database
        /// </summary>
        /// <returns>
        /// List of categories
        /// </returns>
        /// <response code="200">a list of categories has been retreived successfully </response>
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            return Ok(await _categoryRepository.GetAllAsync());
        }

        /// <summary>
        /// Get a specific category by id
        /// </summary>
        /// <returns>
        /// Returns a category if its found in our database
        /// </returns>
        /// <response code="200">Retuens category and its has been found successfully</response>
        /// <response code="404">Category is not found in our database</response>

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryRepository.GetByIdAsync(id);
            if (category == null) return NotFound();

            return Ok(category);
        }



        /// <summary>
        /// Add new Category
        /// </summary>
        /// <param name="createCategoryDto"></param>
        /// <returns>
        ///  returns a newly created category
        /// </returns>
        /// /// <remarks>
        /// Sample request:
        ///
        ///     POST /Post
        ///     { 
        ///        "name": "Sports",
        ///       
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Category has been created successfully</response>
        /// <response code="400">There was validation error in cateogry values </response>

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            var category = new Category { Name = createCategoryDto.Name };
           await _categoryRepository.CreateAsync(category);

            return CreatedAtAction(nameof(GetCategoryById), new { id = category.Id }, category);

        }

    }
}
