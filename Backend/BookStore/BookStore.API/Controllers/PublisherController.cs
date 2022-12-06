using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublisherController : ControllerBase
    {
        private readonly IPublisherRepository _repo;

        public PublisherController(IPublisherRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPublishers()
        {
            return Ok(await _repo.GetAllPublishersAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPublisherById(int id)
        {
            var publisher = await _repo.GetPublisherByIdAsync(id);
            if (publisher != null)
            {
                return Ok(publisher);
            }

            return NotFound();
        }


        [HttpPost]
        public async Task<IActionResult> CreatePublisher(Publisher publisherToCreate)
        {
            var publisher = await _repo.CreateAsync(publisherToCreate);

            return CreatedAtAction(nameof(GetPublisherById), new { id = publisher.Id }, publisher);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePublisher(int id, Publisher publisherToUpdate)
        {
            var publisher = await _repo.UpdateAsync(id, publisherToUpdate);
            if (publisher != null)
            {
                return Ok(publisher);
            }

            return NotFound();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublisher(int id)
        {
            var isDeleted = await _repo.DeleteAsync(id);
            if (isDeleted) return Ok();

            return BadRequest();
        }
    }
}
