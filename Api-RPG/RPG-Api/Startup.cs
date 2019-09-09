using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using RPG.Api.Persistence;
using RPG.Api.Domain.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using RPG.Api.Domain.Repositories;
using RPG.Api.Persistence.Repositories;
using RPG.Api.Services;

namespace RPG.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });
            services.AddAutoMapper();
            services.AddMvc().AddJsonOptions(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddDbContext<RpgDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));
            services.AddScoped<IAuthorizeService, AuthorizeService>();
            services.AddScoped<IPersonalDataRepository, PersonalDataRepository>();
            services.AddScoped<IPersonalDataService, PersonalDataService>();

            services.AddScoped<DbRepository>();

            services
               .AddAuthentication(
                   options =>
                   {
                       options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                       options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                   })
              .AddJwtBearer(options =>
              {
                  options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                  {
                      ValidateIssuer = true,
                      ValidateAudience = true,
                      ValidateLifetime = true,
                      ValidateIssuerSigningKey = true,
                      ValidIssuer = Configuration["Jwt:Issuer"],
                      ValidAudience = Configuration["Jwt:Issuer"],
                     // IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                  };
              });
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("MyPolicy");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
