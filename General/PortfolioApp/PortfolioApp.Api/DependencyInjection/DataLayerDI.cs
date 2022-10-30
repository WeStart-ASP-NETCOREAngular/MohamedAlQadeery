using Microsoft.EntityFrameworkCore;
using PortfolioApp.Dal;

namespace PortfolioApp.Api.DependencyInjection
{
    public static class DataLayerDI
    {
        public static IServiceCollection AddDataLayer(this IServiceCollection services,IConfiguration config)
        {
            services.AddDbContext<PortfolioAppDbContext>(options =>
            {
                options.UseSqlServer(config.GetConnectionString("Default"));
            });

            return services;
        }
    }
}
