using Mapster;
using TodoApp.core.DTOs;
using TodoApp.domain.Models;

namespace TodoApp.api.Mapping
{
    public class CategoryMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<Category, DisplayCategoryDto>();
        }
    }
}
