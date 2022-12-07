using BookStore.API.Data;
using BookStore.API.Interfaces.Repositories;
using BookStore.API.Models;
using BookStore.API.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data
{
    public static class DataLayerDI
    {
        public static IServiceCollection AddDataLayer(this IServiceCollection services, ConfigurationManager configurationManager)
        {
            services.AddDbContext<BookStoreDbContext>(options =>
            {
                options.UseSqlServer(configurationManager.GetConnectionString("Default"));
            });

            services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 3;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.User.RequireUniqueEmail = true;


            })
                .AddEntityFrameworkStores<BookStoreDbContext>()
                .AddDefaultTokenProviders();

            services.AddScoped<IAuthorRepository,AuthorRepository>();
            services.AddScoped<ICategoryRepository,CategoryRepository>();
            services.AddScoped<ITranslatorRepository,TranslatorRepository>();
            services.AddScoped<IPublisherRepository,PublisherRepository>();
            services.AddScoped<IZoneRepository,ZoneRepository>();
            services.AddScoped<IBookRepository,BookRepository>();
            services.AddScoped<ISalesRepository,SalesRepository>();
            services.AddScoped<IAddressRepository,AddressRepository>();
            services.AddScoped<IStaticPagesRepository,StaticPagesRepository>();
            services.AddScoped<IContactusRepository,ContactusRepository>();

            return services;
        }
    }
}
