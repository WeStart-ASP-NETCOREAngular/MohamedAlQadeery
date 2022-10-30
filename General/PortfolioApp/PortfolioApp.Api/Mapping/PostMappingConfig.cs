using Mapster;
using PortfolioApp.Core.DTOs;
using PortfolioApp.Domain.Models;

namespace PortfolioApp.Api.Mapping
{
    public class PostMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<CreatePostDto, Post>();

            config.NewConfig<Post, ListPostDto>();
        }
    }
}
