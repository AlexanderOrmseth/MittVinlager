using System.Globalization;
using API.Context;
using API.Entities;
using API.Extensions;
using API.Filters;
using API.Interfaces;
using API.Middleware;
using API.Repositories;
using API.Services;
using FluentValidation;
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
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            opt.Filters.Add(typeof(DelayFilter));
        }
    })
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    });

// Db connection for development and production (heroku)
builder.Services.AddDbContext<MyDbContext>(options =>
{
    var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    string connStr;

    if (env == "Development")
    {
        // Use connection string from file.
        connStr = configuration.GetConnectionString("DefaultConnection");
    }
    else
    {
        // Use connection string provided at runtime by Heroku.
        var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

        // Parse connection URL to connection string for Npgsql
        connUrl = connUrl.Replace("postgres://", string.Empty);
        var pgUserPass = connUrl.Split("@")[0];
        var pgHostPortDb = connUrl.Split("@")[1];
        var pgHostPort = pgHostPortDb.Split("/")[0];
        var pgDb = pgHostPortDb.Split("/")[1];
        var pgUser = pgUserPass.Split(":")[0];
        var pgPass = pgUserPass.Split(":")[1];
        var pgHost = pgHostPort.Split(":")[0];
        var pgPort = pgHostPort.Split(":")[1];

        connStr =
            $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};SSL Mode=Require;Trust Server Certificate=true";
    }

    // Whether the connection string came from the local development configuration file
    // or from the environment variable from Heroku, use it to set up your DbContext.
    options.UseNpgsql(connStr);
});

// Cors settings
builder.Services.ConfigureCors(myAllowSpecificOrigins);

// JWT, Auth, Identity
builder.Services.AddIdentityCore<User>(opt =>
    {
        // identity options
        opt.SignIn.RequireConfirmedAccount = false;
        opt.SignIn.RequireConfirmedEmail = false;
        opt.User.RequireUniqueEmail = false;
    })
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
builder.Services.AddHttpClient("Vinmonopolet", httpClient =>
{
    // Base URL
    httpClient.BaseAddress = new Uri(configuration["VinmonopoletSettings:BaseURL"]);
    // API Key
    httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", configuration["VinmonopoletSettings:APIKey"]);
});


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
else
{
    app.UseHttpsRedirection();
}

// static files
app.UseDefaultFiles();
app.UseStaticFiles();

// Cors
app.UseCors(myAllowSpecificOrigins);

// order is important
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// routing fallback
app.MapFallbackToController("Index", "Fallback");

// MigrateAsync
using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    await context.Database.MigrateAsync();
}
catch (Exception e)
{
    logger.LogError(e, "Problem migrating data");
}

app.Run();