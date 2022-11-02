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


        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            var category = new Category { Name = createCategoryDto.Name };
            var createdCategory = await _repo.CreateAsync(category);

            return Ok(_mapper.Map<DisplayCategoryDto>(createdCategory));
        }


    }
}
