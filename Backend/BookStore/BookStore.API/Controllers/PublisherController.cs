using BookStore.API.DTOs.PublisherDto;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Interfaces.Services;
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
        private readonly IImageService _imageService;

        public PublisherController(IPublisherRepository repo,IMapper mapper,IImageService imageService)
        {
            _repo = repo;
            _mapper = mapper;
            _imageService = imageService;
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
        public async Task<IActionResult> CreatePublisher([FromForm]PostPublisherRequest publisherToCreate)
        {
           var logo =  _imageService.UploadImage(publisherToCreate.LogoImage);

            if (logo == "") return BadRequest("File is not image ");

            var publisher = new Publisher { Name = publisherToCreate.Name, Logo = logo };

            await _repo.CreateAsync(publisher);

            return CreatedAtAction(nameof(GetPublisherById), new { id = publisher.Id }, publisher);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePublisher(int id,[FromForm] PutPublisherRequest publisherToUpdate)
        {
            var publisher = new Publisher();
          
            if(publisherToUpdate.LogoImage != null)
            {
                var logo = _imageService.UploadImage(publisherToUpdate.LogoImage);

                if (logo == "") return BadRequest("File is not image ");
                publisher.Logo = logo;
            }

            publisher.Name = publisherToUpdate.Name;
            
             await _repo.UpdateAsync(id, publisher);
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
