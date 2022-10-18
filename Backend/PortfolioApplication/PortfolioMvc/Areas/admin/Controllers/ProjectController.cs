using Microsoft.AspNetCore.Mvc;

namespace PortfolioMvc.Areas.admin.Controllers
{
    public class ProjectController : AdminBaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
