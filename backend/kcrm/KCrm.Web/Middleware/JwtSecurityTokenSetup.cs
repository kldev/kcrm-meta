using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace KCrm.Web.Middleware {
    public static class JwtSecurityTokenSetup {
        public static IServiceCollection AddJwtService(this IServiceCollection services, IConfiguration configuration) {

            var seceretKey = configuration["JwtSecurityToken"] ?? "defualt-key";

            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme).AddJwtBearer (
                config => {
                    config.RequireHttpsMetadata = false;
                    config.SaveToken = true;
                   
                    config.TokenValidationParameters = new TokenValidationParameters {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey (Encoding.ASCII.GetBytes (seceretKey)),
                       
                        ValidateIssuer = false,
                        ValidateAudience = false,                        
                        ValidateLifetime = true
                    };
                });

            return services;
        }
        
    }
}
