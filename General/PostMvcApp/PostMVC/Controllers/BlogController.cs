using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PostMVC.Models;

namespace PostMVC.Controllers
{
    public class BlogController : Controller
    {
        private static readonly List<Post> _posts = new List<Post>();

        public IActionResult Index()
        {
            return View(_posts);
        }


        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Add(Post post)
        {
            Random rnd = new Random();
            post.Id = rnd.Next();
            _posts.Add(post);
            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Edit(int Id)
        {

            var post = _posts.FirstOrDefault(p => p.Id == Id);

            return View(post);
        }


        [HttpPost]
        public IActionResult Edit(Post editPost)
        {
            if (editPost != null)
            {
                var post = _posts.FirstOrDefault(p => p.Id == editPost.Id);
                post.Title = editPost.Title;
            }

            return RedirectToAction("Index");
        }



    }
}