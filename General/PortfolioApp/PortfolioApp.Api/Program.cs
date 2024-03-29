using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using PortfolioApp.Api.DependencyInjection;
using PortfolioApp.Api.Extensions;
using PortfolioApp.Dal;
using PortfolioApp.Dal.Repositories;
using PortfolioApp.Domain.Abstraction.Repositories;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Portfolio Api",
        Description = "An ASP.NET Core Web API for managing Portfolio",
       
    });

    

    // using System.Reflection;
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});


builder.Services.AddDataLayer(builder.Configuration)
    .AddLocalzitionService()
    .AddMapster();


builder.Services.AddScoped<IPostRepository,PostRepository>();
builder.Services.AddScoped<IProjectRepository,ProjectRepository>();





var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseLocalization();
app.MapControllers();

app.Run();
