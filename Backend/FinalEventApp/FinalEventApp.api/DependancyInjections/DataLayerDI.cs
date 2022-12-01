﻿using FinalEventApp.api.Data;
using FinalEventApp.api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FinalEventApp.api.DependancyInjections
{
    public static class DataLayerDI
    {
        public static IServiceCollection AddDataLayer(this IServiceCollection services, ConfigurationManager configurationManager)
        {
            services.AddDbContext<EventAppDbContext>(options =>
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

            })
                .AddEntityFrameworkStores<EventAppDbContext>()
                .AddDefaultTokenProviders();
            return services;
        }
    }
}
