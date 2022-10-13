using DAL;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using PortfolioMvc.ViewModels;

namespace PortfolioMvc.Controllers
{
    public class ProjectController : Controller
    {
        private readonly PortfolioDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProjectController(PortfolioDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            var projects = _context.Projects.ToList();
            return View(projects);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(CreateProjectVM createProjectVm)
        {
            if (!ModelState.IsValid) return View();

            var uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Images");
            var uniqueName = Guid.NewGuid().ToString() + Path.GetExtension(createProjectVm.Image.FileName);
            // ->0f8fad5b-d9cb-469f-a165-70867728950e.jpg

            var filePath = Path.Combine(uploadFolder, uniqueName);

            //webserver/Images/0f8fad5b-d9cb-469f-a165-70867728950e.jpg
            createProjectVm.Image.CopyTo(new FileStream(filePath, FileMode.Create));

            _context.Projects.Add(new Project {
                Title=createProjectVm.Title,
                Url = createProjectVm.Url,
                ImagePath = uniqueName
            });

            _context.SaveChanges();

            TempData["success"] = "Project has been added successfully !";
            
            return RedirectToAction(nameof(Create));
        }
    }
}
