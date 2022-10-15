using DAL;
using Microsoft.AspNetCore.Mvc;

namespace PortfolioMvc.Controllers
{
    public class PostController : BaseController
    {
        private readonly PortfolioDbContext _context;

        public PostController(PortfolioDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var posts = _context.Posts.ToList();
            return View(posts);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }



    }
}
