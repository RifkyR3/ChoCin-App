using ChoCin_App.Entities;
using ChoCin_App.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using NSwag;
using NSwag.Generation.Processors.Security;
using System.Net;

namespace ChoCin_App.Server
{
    public class ProgramServices
    {
        private readonly IServiceCollection _services;

        public ProgramServices(IServiceCollection services)
        {
            _services = services;
        }

        public void RegisterServices()
        {
            this._services.AddScoped<AuthService>();
            this._services.AddScoped<UserService>();
            this._services.AddScoped<GroupService>();
            this._services.AddScoped<ModuleService>();
        }

        public void RegisterDatabase(string? connectionString)
        {
            this._services.AddDbContext<DefaultDbContext>(options =>
            {
                options.UseNpgsql(connectionString, strategy =>
                {
                    strategy.EnableRetryOnFailure();
                })
                .ConfigureWarnings(warnings => warnings.Throw(RelationalEventId.QueryPossibleUnintendedUseOfEqualsWarning))
                .EnableSensitiveDataLogging(true);
            });
        }

        public void ConfigureServices()
        {
            this._services.AddOpenApiDocument(options =>
            {
                options.PostProcess = document =>
                {
                    document.Info = new OpenApiInfo
                    {
                        Version = "v1",
                        Title = "JWT Token Authentication API",
                        Description = "ChoCin-App API"
                    };
                };
                options.AddSecurity("Bearer", Enumerable.Empty<string>(), new OpenApiSecurityScheme
                {
                    Name = nameof(Authorization),
                    Type = OpenApiSecuritySchemeType.ApiKey,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    In = OpenApiSecurityApiKeyLocation.Header,
                    BearerFormat = "JWT",
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below",
                });

                options.OperationProcessors.Add(
                    new AspNetCoreOperationSecurityScopeProcessor("Bearer"));
            });

            this._services.AddControllers();
        }
    }
}