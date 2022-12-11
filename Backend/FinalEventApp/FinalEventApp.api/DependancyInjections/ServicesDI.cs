using FinalEventApp.api.Abstractions.Services;
using FinalEventApp.api.Services;

namespace FinalEventApp.api.DependancyInjections
{
    public static class ServicesDI
    {
        public static IServiceCollection AddServicesDI(this IServiceCollection services)
        {
            services.AddScoped<IImageService, ImageService>();

            return services;
        }
    }
}
