using API.Context;
using API.Entities;
using API.Extensions;
using API.Filters;
using API.Interfaces;
using API.Middleware;
using API.Repositories;
using API.Services;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.

// controller
builder.Services.AddControllers()
    .AddFluentValidation(fv => { fv.RegisterValidatorsFromAssemblyContaining<Program>(); })
    .AddMvcOptions(opt =>
    {
        // Delay filter for all endpoints
        // Todo: ONLY FOR TESTING!
        opt.Filters.Add(typeof(DelayFilter));
    })
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    });


// Add db connection
builder.Services.AddDbContext<MyDbContext>(opt =>
    opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

// Cors settings
builder.Services.ConfigureCors(myAllowSpecificOrigins);

// JWT, Auth, Identity
builder.Services.AddIdentityCore<User>(opt => { opt.User.RequireUniqueEmail = true; })
    .AddRoles<Role>()
    .AddEntityFrameworkStores<MyDbContext>();

builder.Services.AddAuthenticationOptions(configuration);
builder.Services.AddAuthorization();

// Added services
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<ImageService>();

// repositories
builder.Services.AddScoped<IWineRepository, WineRepository>();
builder.Services.AddScoped<IWishItemRepository, WishItemRepository>();

// add an httpClient factory (in order fetch vinmonopolet API)
builder.Services.AddHttpClient();

// Configure Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwaggerAuth();

var app = builder.Build();

// set localization -> this fixes decimal error -> "." instead of ","
app.UseRequestLocalization(new RequestLocalizationOptions().SetDefaultCulture("en-US"));

// custom server error (on development with details, not in production)
app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

// Cors
app.UseCors(myAllowSpecificOrigins);

// order is important
app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();