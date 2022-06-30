using API.Context;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Middleware;
using API.Models;
using API.Repositories;
using API.Services;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Serialization;

const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

// Add services to the container.

// controller
builder.Services.AddControllers()
    .AddFluentValidation(fv => { fv.RegisterValidatorsFromAssemblyContaining<Program>(); })
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
builder.Services.AddIdentityCore<User>(opt =>
    {
        //opt.Password.RequireNonAlphanumeric = false;
        opt.User.RequireUniqueEmail = true;

        // TODO: not working
        opt.SignIn.RequireConfirmedEmail = true;
    })
    .AddRoles<Role>()
    .AddEntityFrameworkStores<MyDbContext>()
    .AddDefaultTokenProviders(); // for email

builder.Services.AddAuthenticationOptions(configuration);
builder.Services.AddAuthorization();

// Added services
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<ImageService>();
// Email
builder.Services.Configure<SmtpSettings>(configuration.GetSection("SmtpSettings"));
builder.Services.AddSingleton<IEmailSender, EmailSender>();

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