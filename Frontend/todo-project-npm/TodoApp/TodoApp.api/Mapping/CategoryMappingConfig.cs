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
            config.NewConfig<Category, ShowCategoryDto>();
                
            config.NewConfig<UpdateCategoryDto, Category>();
            config.NewConfig<CreateCategoryDto, Category>();
        }
    }
}
