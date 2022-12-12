using FinalEventApp.api.DTOs;
using FinalEventApp.api.Models;
using Mapster;

namespace FinalEventApp.api.Mapping
{
    public class CategoryTagMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            
            config.NewConfig<Category, CategoryResponseDto>();
            config.NewConfig<CreateCategoryDto, Category>();
            config.NewConfig<UpdateCategoryDto, Category>();


            config.NewConfig<Tag, TagResponseDto>();
                    
            config.NewConfig<CreateTagDto,Tag>();
            config.NewConfig<UpdateTagDto,Tag>();


            
        }
    }
}
