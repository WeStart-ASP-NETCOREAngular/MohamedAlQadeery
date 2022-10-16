using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PortfolioMvc.Controllers
{
    [Authorize]
    public class BaseController : Controller
    {
        protected void GenrateTempMessage(string key, string body)
        {
            TempData[key] = body;
        }
    }
}
