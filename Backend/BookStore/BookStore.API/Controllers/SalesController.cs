using BookStore.API.DTOs.BookDto.Repsonse;
using BookStore.API.DTOs.SalesDto.Request;
using BookStore.API.DTOs.SalesDto.Response;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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


        [HttpGet]
        public async Task<IActionResult> GetAllSales()
        {
            var sales = await _repo.GetAllSales();

            return Ok(_mapper.Map<List<SalesResponse>>(sales));
        }


        [HttpPost("{bookId}/add-sale")]
        public async Task<IActionResult> AddBookSale(int bookId,AddSaleRequest saleRequest)
        {
            //Here we get Authenticted user 
            // this code is for testing purpose only until we implement authnetication
            // var user = await _userManager.FindByIdAsync("b5feebcf-f317-4117-81c5-f95c98e3999e");
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;


            var saleToAdd = _mapper.Map<Sales>(saleRequest);

            saleToAdd.BookId = bookId;
            saleToAdd.AppUserId = userId;
          
            var isAdded = await _repo.AddBookSale(saleToAdd);
            if(isAdded != null)
            {
                return Ok(_mapper.Map<PostSalesResponse>(isAdded));
            }

            return BadRequest();
        }


        [HttpGet("most-orderd")]
        public async Task<IActionResult> GetMostOrderdBook()
        {
            var book = await _repo.GetMostOrderdBookAsync(); 
            if(book != null)
            {
                return Ok(_mapper.Map<BookResponse>(book));
            }
           

            return BadRequest();
        }


        [HttpGet("most-sold")]
        public async Task<IActionResult> GetMostSoldBook()
        {
            var book = await _repo.GetMostSoldBookAsync();
            if (book != null)
            {
                return Ok(_mapper.Map<BookResponse>(book));
            }


            return BadRequest();
        }

        [HttpGet("user-sales")]
        public async Task<IActionResult>GetUserSales()
        {
            //Here we get Authenticted user 
            // this code is for testing purpose only until we implement authnetication
            //var user = await _userManager.FindByIdAsync("b5feebcf-f317-4117-81c5-f95c98e3999e");
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var sales = await _repo.GetUserSales(userId);
            if (sales != null)
            {
                return Ok(_mapper.Map<List<SalesResponse>>(sales));
            }


            return BadRequest();
        }


        [HttpGet("book-sales/{bookId}")]
        public async Task<IActionResult> GetBookSales(int bookId)
        {


            var sales = await _repo.GetBookSales(bookId);
            if (sales != null)
            {
                return Ok(_mapper.Map<List<SalesResponse>>(sales));
            }


            return BadRequest();
        }


        [HttpPut("{saleId}/{status}")]
        [Authorize(Roles ="admin")]
        public async Task<IActionResult> UpdateSaleStatus(int saleId,int status)
        {


            var sale = await _repo.UpdateStatus(saleId,status);
            if (sale != null)
            {
                return Ok(_mapper.Map<SalesResponse>(sale));
            }


            return BadRequest();
        }

    }
}
