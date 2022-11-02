using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.core.DTOs;
using TodoApp.domain.Abstraction.Repositories;
using TodoApp.domain.Models;

namespace TodoApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repo;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult>GetAllCategories()
        {
            return Ok(await _repo.GetAllAsync());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _repo.GetByIdAsync(id);
            if (category == null) return NotFound();

            return Ok(_mapper.Map<ShowCategoryDto>(category));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            var category = _mapper.Map<Category>(createCategoryDto);
            var createdCategory = await _repo.CreateAsync(category);

            return CreatedAtAction(nameof(GetCategoryById), new {id = category.Id}, _mapper.Map<DisplayCategoryDto>(createdCategory));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id , UpdateCategoryDto updateCategoryDto)
        {
            if (await _repo.GetByIdAsync(id) == null) return NotFound();

            var categoryToUpdate = _mapper.Map<Category>(updateCategoryDto);
            categoryToUpdate.Id = id;

            await _repo.UpdateAsync(categoryToUpdate);

            return Ok(_mapper.Map<DisplayCategoryDto>(categoryToUpdate));

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            if(!await _repo.DeleteAsync(id)) { return BadRequest(); }

            return NoContent();
         }

    }
}
