using DAL;
using Microsoft.AspNetCore.Mvc;
using PortfolioMvc.ViewModels;

namespace PortfolioMvc.Controllers
{
    public class ProjectController : Controller
    {
        private readonly PortfolioDbContext _context;

        public ProjectController(PortfolioDbContext context)
        {
            _context = context;
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
            return View();
        }
    }
}
