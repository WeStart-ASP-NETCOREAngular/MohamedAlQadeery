namespace PortfolioApp.Api.DependencyInjection
{
    public static class LocaliztionDI
    {
        public static IServiceCollection AddLocalzitionService(this IServiceCollection services)
        {
            services.AddLocalization(options =>
            {
                options.ResourcesPath = "Resources";
            });


            return services;
        }
    }
}
