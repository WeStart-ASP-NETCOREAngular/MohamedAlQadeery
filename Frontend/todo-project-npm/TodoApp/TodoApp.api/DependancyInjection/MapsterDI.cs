using Mapster;
using MapsterMapper;
using System.Reflection;

namespace TodoApp.api.DependancyInjection
{
    public static class MapsterDI
    {
        public static IServiceCollection AddMapster(this IServiceCollection services)
        {
            var config = TypeAdapterConfig.GlobalSettings;
            config.Scan(Assembly.GetExecutingAssembly());

            services.AddSingleton(config);
            services.AddScoped<IMapper, ServiceMapper>();

            return services;
        }
    }
}
