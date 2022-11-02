using Mapster;
using TodoApp.core.DTOs;
using TodoApp.domain.Models;

namespace TodoApp.api.Mapping
{
    public class TodoMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Todo, ListTodoDto>()
                .Map(d=>d.CategoryName,s=>s.Category.Name);

            config.NewConfig<Todo, ShowTodoDto>();

            config.NewConfig<UpdateTodoDto, Todo>();
            config.NewConfig<CreateTodoDto, Todo>();
        }
    }
}
