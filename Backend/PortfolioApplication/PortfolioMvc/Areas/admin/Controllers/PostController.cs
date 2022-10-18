using Microsoft.AspNetCore.Mvc;

namespace PortfolioMvc.Areas.admin.Controllers
{
    public class PostController : AdminBaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
