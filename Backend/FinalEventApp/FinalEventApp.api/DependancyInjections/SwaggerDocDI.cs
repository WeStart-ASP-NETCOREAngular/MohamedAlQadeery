using Microsoft.OpenApi.Models;
using System.Reflection;

namespace FinalEventApp.api.DependancyInjections
{
    public static class SwaggerDocDI
    {

        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
             {
                 options.SwaggerDoc("v1", new OpenApiInfo
                 {
                     Version = "v1",
                     Title = "Events Web App Api",
                     Description = "An ASP.NET Core Web API for events web application",

                 });



                 // using System.Reflection;
                 var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                 options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
             });
            return services;
        }
    }
}
