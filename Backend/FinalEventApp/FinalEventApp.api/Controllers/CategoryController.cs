using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalEventApp.api.Controllers
{
    /// <summary>
    /// Category api Controller 
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]

    public class CategoryController : ControllerBase
    {

        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        /// <summary>
        /// Category Controller to inject services
        /// </summary>
        /// <param name="categoryRepository"></param>
        public CategoryController(ICategoryRepository categoryRepository,IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
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
            return Ok(await _categoryRepository.GetAllCategoriesAsync());
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
            var category = await _categoryRepository.GetCategoryByIdAsync(id);
            if (category == null) return NotFound();

            return Ok(_mapper.Map<CategoryResponseDto>(category));
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
            var categoryToCreate = _mapper.Map<Category>(createCategoryDto);
            await _categoryRepository.CreateAsync(categoryToCreate);

            return CreatedAtAction(nameof(GetCategoryById), new { id = categoryToCreate.Id }, _mapper.Map<CategoryResponseDto>(categoryToCreate));

        }

        /// <summary>
        /// Update a specifc Category by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updateCategoryDto"></param>
        /// <returns>
        /// returns a category after being updated
        /// </returns>
        /// 
        /// /// /// <remarks>
        /// Sample request:
        ///
        ///     PUT /Category
        ///     { 
        ///        "name": "Updated Sport",
        ///       
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Category is updated successfully and returns updated category</response>
        /// <response code="400">Category is not updated id/validation error</response>

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
        {
            var categoryToUpdate = _mapper.Map<Category>(updateCategoryDto);
            var isUpdated = await _categoryRepository.UpdateAsync(id, categoryToUpdate);
            if (isUpdated != null) return Ok(_mapper.Map<CategoryResponseDto>(isUpdated));

            return BadRequest();

        }




        /// <summary>
        /// Delete a specfic category by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>
        ///  returns 204 success status code with no content
        /// </returns>
        /// <response code="204">Category is deleted successfully</response>
        /// <response code="400">Category is not deleted (Id could be wrong)</response>
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteCategory(int id)
        {
            var isDeleted = await _categoryRepository.DeleteAsync(id);
            if (isDeleted) return NoContent();

            return BadRequest();
        }

    }
}
