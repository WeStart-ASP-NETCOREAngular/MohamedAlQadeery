using Microsoft.AspNetCore.Mvc;

namespace PortfolioMvc.Controllers
{
    public class BaseController : Controller
    {
        protected void GenrateTempMessage(string key, string body)
        {
            TempData[key] = body;
        }
    }
}
