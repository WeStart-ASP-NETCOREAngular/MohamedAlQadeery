using BookStore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly BookStoreDbContext _context;

        public TestController(BookStoreDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<IActionResult> Test()
        {


            return Ok();
        }

    }

}
