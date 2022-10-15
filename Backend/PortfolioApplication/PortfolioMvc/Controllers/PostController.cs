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

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);

            if (post == null) return NotFound();
            return View(new EditPostVM { Id = post.Id, Title = post.Title,Body=post.Body });

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(EditPostVM editPostVM)
        {
            if (!ModelState.IsValid) return View();
            var post = _context.Posts.FirstOrDefault(p => p.Id == editPostVM.Id);
            if (post == null) return NotFound();

            post.Title = editPostVM.Title;
            post.Body = editPostVM.Body;

            _context.Posts.Update(post);
            _context.SaveChangesAsync();
            GenrateTempMessage("success", "Post has been updated successfully");

            return RedirectToAction(nameof(Edit), new {id=post.Id});
        }



        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id)
        {
            var post = _context.Posts.FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();
           
            _context.Posts.Remove(post);
            _context.SaveChanges();

            GenrateTempMessage("success", "Post has been deleted successfully");
            return RedirectToAction(nameof(Index));
        }
    }
}
