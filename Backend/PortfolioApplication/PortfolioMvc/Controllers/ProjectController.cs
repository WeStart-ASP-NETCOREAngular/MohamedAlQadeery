using DAL;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using PortfolioMvc.ViewModels;

namespace PortfolioMvc.Controllers
{
    public class ProjectController : BaseController
    {
        private readonly PortfolioDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        private  const string IMAGES_FOLDER="Images";

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
        [ValidateAntiForgeryToken]
        public IActionResult Create(CreateProjectVM createProjectVm)
        {
            if (!ModelState.IsValid) return View();

            string uniqueName = UploadImage(createProjectVm.Image);

            _context.Projects.Add(new Project
            {
                Title = createProjectVm.Title,
                Url = createProjectVm.Url,
                ImagePath = uniqueName
            });

            _context.SaveChanges();

            GenrateTempMessage("success", "Project has been added successfully !");

            return RedirectToAction(nameof(Create));
        }

      

        [HttpGet]

        public IActionResult Edit(int id)
        {
           
            var project = _context.Projects.FirstOrDefault(p => p.Id == id);
            
            if (project == null ) return NotFound();
            return View(new EditProjectVM { Id=project.Id,Title =project.Title,ImagePath = project.ImagePath,Url=project.Url});
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(EditProjectVM editProjectVM)
        {
            if (!ModelState.IsValid) return View();

            var project = _context.Projects.FirstOrDefault(p=>p.Id==editProjectVM.Id);
            if (project == null) return NotFound();

            project.Title = editProjectVM.Title;
            project.Url = editProjectVM.Url;
            if(editProjectVM.Image != null)
            {
               var isDeleted =  DeleteImage(project.ImagePath);
                if (!isDeleted) return BadRequest();

                var uniqueName = UploadImage(editProjectVM.Image);
                project.ImagePath = uniqueName;
            }
            _context.Projects.Update(project);
            _context.SaveChanges();
            GenrateTempMessage("success", "Project has been updated successfully!");

            return RedirectToAction(nameof(Edit), new {id = project.Id});
        }


        [HttpGet]
        public IActionResult Show(int id)
        {
            var project = _context.Projects.FirstOrDefault(p => p.Id == id);
            if (project == null) return NotFound();

            return View(new ShowProjectVM { Title=project.Title,Url=project.Url,ImagePath = project.ImagePath});

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

        private bool DeleteImage(string imageName)
        {
            var uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, IMAGES_FOLDER);
            var filePath = Path.Combine(uploadFolder, imageName);
            if (!System.IO.File.Exists(filePath)) return false;

            System.IO.File.Delete(filePath);
            return true;
            

        }

      

    }
}
