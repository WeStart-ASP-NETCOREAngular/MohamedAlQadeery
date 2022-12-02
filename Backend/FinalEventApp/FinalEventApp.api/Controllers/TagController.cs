using FinalEventApp.api.Abstractions.Repositories;
using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalEventApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TagController : ControllerBase
    {


        private readonly ITagRepository _TagRepository;
        private readonly IMapper _mapper;

        /// <summary>
        /// Tag Controller to inject services
        /// </summary>
        /// <param name="TagRepository"></param>
        public TagController(ITagRepository TagRepository,IMapper mapper)
        {
            _TagRepository = TagRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Get All Tags from database
        /// </summary>
        /// <returns>
        /// List of Tags
        /// </returns>
        /// <response code="200">a list of Tags has been retreived successfully </response>
        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            return Ok(await _TagRepository.GetAllTagsAsync());
        }

        /// <summary>
        /// Get a specific Tag by id
        /// </summary>
        /// <returns>
        /// Returns a Tag if its found in our database
        /// </returns>
        /// <response code="200">Retuens Tag and its has been found successfully</response>
        /// <response code="404">Tag is not found in our database</response>

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTagById(int id)
        {
            var tag = await _TagRepository.GetTagByIdAsync(id);
            if (tag == null) return NotFound();

            return Ok(_mapper.Map<TagResponseDto>(tag));
        }



        /// <summary>
        /// Add new Tag
        /// </summary>
        /// <param name="createTagDto"></param>
        /// <returns>
        ///  returns a newly created Tag
        /// </returns>
        /// /// <remarks>
        /// Sample request:
        ///
        ///     POST /Post
        ///     { 
        ///        "name": "Sports",
        ///       
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Tag has been created successfully</response>
        /// <response code="400">There was validation error in cateogry values </response>

        [HttpPost]
        [Authorize(Roles ="admin")]
        public async Task<IActionResult> CreateTag(CreateTagDto createTagDto)
        {
            var TagToCreate = _mapper.Map<Tag>(createTagDto);
            await _TagRepository.CreateAsync(TagToCreate);

            return CreatedAtAction(nameof(GetTagById), new { id = TagToCreate.Id }, _mapper.Map<TagResponseDto>(TagToCreate));

        }

        /// <summary>
        /// Update a specifc Tag by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updateTagDto"></param>
        /// <returns>
        /// returns a Tag after being updated
        /// </returns>
        /// 
        /// /// /// <remarks>
        /// Sample request:
        ///
        ///     PUT /Tag
        ///     { 
        ///        "name": "Music",
        ///       
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Tag is updated successfully and return updated tag</response>
        /// <response code="400">Tag is not updated id/validation error</response>

        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<IActionResult> UpdateTag(int id, UpdateTagDto updateTagDto)
        {
            var TagToUpdate = _mapper.Map<Tag>(updateTagDto);
            var isUpdated = await _TagRepository.UpdateAsync(id, TagToUpdate);
            if (isUpdated != null) return Ok(_mapper.Map<TagResponseDto>(isUpdated));

            return BadRequest();

        }




        /// <summary>
        /// Delete a specfic Tag by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns>
        ///  returns 204 success status code with no content
        /// </returns>
        /// <response code="204">Tag is deleted successfully</response>
        /// <response code="400">Tag is not deleted (Id could be wrong)</response>
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]

        public async Task<IActionResult> DeleteTag(int id)
        {
            var isDeleted = await _TagRepository.DeleteAsync(id);
            if (isDeleted) return NoContent();

            return BadRequest();
        }

    }
}
