using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PortfolioApp.Api.DTOs;
using PortfolioApp.Domain.Abstraction.Repositories;
using PortfolioApp.Domain.Models;

namespace PortfolioApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _repo;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private const string IMAGES_FOLDER = "Images";

        public ProjectController(IProjectRepository repo, IWebHostEnvironment webHostEnvironment)
        {
            _repo = repo;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            return Ok(await _repo.GetAllAsync());
        }


        [HttpPost]
        public async Task<IActionResult> AddProject(CreateProjectDto createProjectDto)
        {
            var imagePath = UploadImage(createProjectDto.ImageFile);
            var project = new Project { Title = createProjectDto.Title, Url = createProjectDto.Url,ImagePath=imagePath};

            return Ok(await _repo.AddAsync(project));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            return Ok(await _repo.GetByIdAsync(id));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, UpdateProjectDto updateProjectDto)
        {
            var imagePath = UploadImage(updateProjectDto.ImageFile);

            var project = new Project { Title = updateProjectDto.Title, Url = updateProjectDto.Url,ImagePath = imagePath };
            var isUpdated = await _repo.UpdateAsync(id, project);
            if (isUpdated) return Ok("Project has been updated");

            return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var isDeleted = await _repo.RemoveAsync(id);
            if (isDeleted) return Ok("Project has been deleted");
            return BadRequest();
        }


        private string UploadImage(IFormFile image)
        {
            var uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, IMAGES_FOLDER);
            var uniqueName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
            // ->0f8fad5b-d9cb-469f-a165-70867728950e.jpg

            var filePath = Path.Combine(uploadFolder, uniqueName);

            //webserver/Images/0f8fad5b-d9cb-469f-a165-70867728950e.jpg
            image.CopyTo(new FileStream(filePath, FileMode.Create));
            return uniqueName;
        }

    }
}
