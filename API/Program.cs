using System.Net;
using System.Text;
using API.Context;
using API.Entities;
using API.Middleware;
using API.Services;
using API.Validators;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


var configuration = builder.Configuration;
// Add services to the container.

// controller
builder.Services.AddControllers()
    .AddFluentValidation(fv => { fv.RegisterValidatorsFromAssemblyContaining<Program>(); })
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        // TODO
    });


// Add db connection
builder.Services.AddDbContext<MyDbContext>(opt =>
    opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));


// cors
builder.Services.AddCors();

// Set up identity
builder.Services.AddIdentityCore<User>(opt => { opt.User.RequireUniqueEmail = true; })
    .AddRoles<Role>()
    .AddEntityFrameworkStores<MyDbContext>();
// set up jwt with identity
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(configuration["JWTSettings:TokenKey"]))
        };
    });
builder.Services.AddAuthorization();

// add token service
builder.Services.AddScoped<TokenService>();
// add image service
builder.Services.AddScoped<ImageService>();

// add an httpClient factory (in order fetch vinmonopolet API)
builder.Services.AddHttpClient();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
// swagger + config the use of jwt token in swagger
builder.Services.AddSwaggerGen(c =>
    {
        // Add token to swagger
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "Jwt auth header",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    },
                    Scheme = "oauth2",
                    Name = "Bearer",
                    In = ParameterLocation.Header
                },
                new List<string>()
            }
        });
    }
);

var app = builder.Build();


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
app.UseCors(corsPolicyBuilder =>
{
    corsPolicyBuilder.WithOrigins("http://localhost:3001", "http://localhost:3000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
});

// order is important
app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

app.Run();