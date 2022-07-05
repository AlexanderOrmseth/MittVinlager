using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API.Extensions;

public static class ServiceExtensions
{
    // Cors
    public static void ConfigureCors(this IServiceCollection services, string name)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(name: name,
                builder => builder.WithOrigins("http://localhost:3001", "http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
        });
    }

    // JWT with Identity
    public static void AddAuthenticationOptions(this IServiceCollection services, ConfigurationManager configuration)
    {
        services.AddAuthentication(options =>
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
            }).AddGoogle(options =>
            {
                var googleAuthNSection = configuration.GetSection("Authentication:Google");
                options.ClientId = googleAuthNSection["ClientId"];
                options.ClientSecret = googleAuthNSection["ClientSecret"];
            });
    }

    // Swagger
    public static void ConfigureSwaggerAuth(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
            {
                // Description
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "MittVinlager API",
                    Version = "v1",
                    Contact = new OpenApiContact
                    {
                        Name = "Alexander Ormseth",
                        Email = "A_ormseth@hotmail.com",
                        Url = new Uri("https://github.com/AlexanderOrmseth"),
                    }
                });
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
    }
}