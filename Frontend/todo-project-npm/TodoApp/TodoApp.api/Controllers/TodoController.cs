using MapsterMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApp.core.DTOs;
using TodoApp.domain.Abstraction.Repositories;
using TodoApp.domain.Models;

namespace TodoApp.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _repo;
        private readonly IMapper _mapper;

        public TodoController(ITodoRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllTodos()
        {
            return Ok(await _repo.GetAllAsync());
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            var todo = await _repo.GetByIdAsync(id);
            if (todo == null) return NotFound();

            return Ok(_mapper.Map<ShowTodoDto>(todo));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTodo(CreateTodoDto createTodoDto)
        {
            var todo = _mapper.Map<Todo>(createTodoDto);
            var createdTodo = await _repo.CreateAsync(todo);
            if(createdTodo == null) { return BadRequest(); }
            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, _mapper.Map<ListTodoDto>(createdTodo));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, UpdateTodoDto updateTodoDto)
        {
            if (await _repo.GetByIdAsync(id) == null) return NotFound();

            var todoToUpdate = _mapper.Map<Todo>(updateTodoDto);
            todoToUpdate.Id = id;

          var todo =   await _repo.UpdateAsync(todoToUpdate);
            if (todo == null) return BadRequest();
            return Ok(_mapper.Map<ListTodoDto>(todoToUpdate));

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            if (!await _repo.DeleteAsync(id)) { return BadRequest(); }

            return NoContent();
        }
    }
}
