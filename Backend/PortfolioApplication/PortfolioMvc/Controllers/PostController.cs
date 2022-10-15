using DAL;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using PortfolioMvc.ViewModels;

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


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(CreatePostVM createPostVM)
        {
            if (!ModelState.IsValid) return View();

            _context.Posts.Add(new Post {Title=createPostVM.Title,Body=createPostVM.Body });
            _context.SaveChanges();
            GenrateTempMessage("success", "Post has been created succesfully");
            return RedirectToAction(nameof(Index));
        }
    }
}
