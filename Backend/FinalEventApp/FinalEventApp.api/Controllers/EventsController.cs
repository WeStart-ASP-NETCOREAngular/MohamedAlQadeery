using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.DTOs;
using FinalEventApp.api.DTOs.EventDto.Request;
using FinalEventApp.api.DTOs.EventDto.Response;
using FinalEventApp.api.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FinalEventApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public EventsController(IEventRepository repo, IMapper mapper,UserManager<AppUser> userManager)
        {
            _repo = repo;
            _mapper = mapper;
            _userManager = userManager;
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
        [Authorize]
        public async Task<IActionResult> Create(PostEventRequest eventRequest)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var newEvent = _mapper.Map<Event>(eventRequest);
            newEvent.OwnerId = userId;
            var createdEvent = await _repo.CreateAsync(newEvent);

            //old way
           // List<EventTag> tags = eventRequest.TagsId.
           //     Select(tagId => new EventTag { EventId = createdEvent.Id, TagId = tagId })
           //     .ToList();

           //await _repo.AssignTagsToEventAsync(createdEvent.Id, tags);


            return CreatedAtAction(nameof(GetEventById), new { id = createdEvent.Id }, _mapper.Map<SingleEventResponse>(createdEvent));
        }

        [HttpPut("{id}")]
        [Authorize]
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
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var isDeleted = await _repo.DeleteAsync(id);
            if(isDeleted) { return NoContent(); }

            return BadRequest();
        }


        [HttpPost("{eventId}/join-event")]
        [Authorize]
        public async Task<IActionResult> JoinEvent(int eventId)
        {
           var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var result = await _repo.JoinEvent(eventId, userId);
            if (result == null) return BadRequest();

            return NoContent();
        }


        [HttpDelete("{eventId}/exit-event")]
        [Authorize]
        public async Task<IActionResult> ExitEvent(int eventId)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var result = await _repo.ExitEvent(eventId, userId);
            if (!result) return BadRequest();

            return NoContent();
        }


        [HttpGet("joined-events")]
        [Authorize]
        public async Task<IActionResult> UserJoinEvent()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var result = await _repo.GetUserJoinedEvents(userId);
            if (result == null) return BadRequest();

            return Ok(_mapper.Map<List<ListEventResponse>>(result));
        }



        [HttpGet("{eventId}/members")]
        public async Task<IActionResult> GetEventMembers(int eventId)
        {
            var result = await _repo.GetEventMembers(eventId);
            if (result == null) return BadRequest();

            return Ok(_mapper.Map<List<MemberDto>>(result));
        }



    }
}

