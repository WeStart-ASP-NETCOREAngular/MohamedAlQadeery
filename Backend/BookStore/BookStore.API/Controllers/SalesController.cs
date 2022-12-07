using BookStore.API.DTOs.SalesDto.Request;
using BookStore.API.DTOs.SalesDto.Response;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ISalesRepository _repo;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public SalesController(ISalesRepository repo ,UserManager<AppUser> userManager,IMapper mapper)
        {
            _repo = repo;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost("{bookId}/add-sale")]
        public async Task<IActionResult> AddBookSale(int bookId,AddSaleRequest saleRequest)
        {
            //Here we get Authenticted user 
            // this code is for testing purpose only until we implement authnetication
            var user = await _userManager.FindByIdAsync("b5feebcf-f317-4117-81c5-f95c98e3999e");
  

            var saleToAdd = _mapper.Map<Sales>(saleRequest);

            saleToAdd.BookId = bookId;
            saleToAdd.AppUserId = user.Id;
          
            var isAdded = await _repo.AddBookSale(saleToAdd);
            if(isAdded != null)
            {
                return Ok(_mapper.Map<PostSalesResponse>(isAdded));
            }

            return BadRequest();
        }
    }
}
