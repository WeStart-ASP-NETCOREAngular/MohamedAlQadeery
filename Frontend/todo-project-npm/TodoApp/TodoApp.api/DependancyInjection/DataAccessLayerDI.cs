using Microsoft.EntityFrameworkCore;
using TodoApp.dal;

namespace TodoApp.api.DependancyInjection
{
    public static class DataAccessLayerDI
    {

        public static IServiceCollection AddDataLayer(this IServiceCollection services , IConfiguration config)
        {
            services.AddDbContext<TodoAppDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("Default"));

            });

            return services;
        }
    }
}
