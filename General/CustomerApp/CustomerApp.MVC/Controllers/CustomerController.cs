using CustomerApp.MVC.DTOs;
using CustomerApp.MVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace CustomerApp.MVC.Controllers
{
    public class CustomerController : Controller
    {
        public static List<Customer> _customers = new List<Customer>();
        public IActionResult Index()
        {
            var listCustomersDto = _customers.Select(c => new ListCustomerDto { FullName = $"{c.FirstName} {c.LastName}" })
              .ToList();

            return View(listCustomersDto);
        }


        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            var listCustomersDto = _customers.Select(c => new ListCustomerDto { FullName = $"{c.FirstName} {c.LastName}" })
                .ToList();

            return Json(listCustomersDto);
        }

        [HttpPost]
        public IActionResult AddCustomer([FromBody] CreateCustomerDto createCustomerDto)
        {
            var customer = new Customer {FirstName = createCustomerDto.FirstName,LastName = createCustomerDto.LastName };

            _customers.Add(customer);

            return Json(new ListCustomerDto { FullName = $"{customer.FirstName} {customer.LastName}" });
        }
    }
}
