using BookStore.API.DTOs.PublisherDto;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublisherController : ControllerBase
    {
        private readonly IPublisherRepository _repo;
        private readonly IMapper _mapper;

        public PublisherController(IPublisherRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllPublishers()
        {
            var publishers = await _repo.GetAllPublishersAsync();

            return Ok(_mapper.Map<List<PublisherResponse>>(publishers));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPublisherById(int id)
        {
            var publisher = await _repo.GetPublisherByIdAsync(id);
            if (publisher != null)
            {
                return Ok(_mapper.Map<PublisherDetailsResponse>(publisher));
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
