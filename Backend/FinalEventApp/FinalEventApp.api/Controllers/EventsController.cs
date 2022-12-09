using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.DTOs.EventDto.Request;
using FinalEventApp.api.DTOs.EventDto.Response;
using FinalEventApp.api.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalEventApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository _repo;
        private readonly IMapper _mapper;

        public EventsController(IEventRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _repo.GetAllEventsAsync();
            var eventDtos = _mapper.Map<List<ListEventResponse>>(events);
            return Ok(eventDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var eventExist = await _repo.GetEventByIdAsync(id);
            if (eventExist == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<SingleEventResponse>(eventExist));

        }


        [HttpPost]
        public async Task<IActionResult> Create(PostEventRequest eventRequest)
        {
            
            var newEvent = _mapper.Map<Event>(eventRequest);
            var createdEvent = await _repo.CreateAsync(newEvent);

            //old way
           // List<EventTag> tags = eventRequest.TagsId.
           //     Select(tagId => new EventTag { EventId = createdEvent.Id, TagId = tagId })
           //     .ToList();

           //await _repo.AssignTagsToEventAsync(createdEvent.Id, tags);


            return CreatedAtAction(nameof(GetEventById), new { id = createdEvent.Id }, _mapper.Map<SingleEventResponse>(createdEvent));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PutEventRequest eventToUpdateDto)
        {
            var eventToUpdate = _mapper.Map<Event>(eventToUpdateDto);

            var eventUpdated = await _repo.UpdateAsync(id, eventToUpdate);



            if (eventUpdated != null)
            {
              return Ok(_mapper.Map<SingleEventResponse>(eventUpdated));
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var isDeleted = await _repo.DeleteAsync(id);
            if(isDeleted) { return NoContent(); }

            return BadRequest();
        }



    
}
}

