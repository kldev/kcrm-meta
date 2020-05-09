using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KCrm.Web.Middleware {
    public static class CorsSetup {

        public readonly static string PolicyName = "corsPolicy";

        public static IServiceCollection AddAppCors(this IServiceCollection services, IConfiguration configuration) {
            var cors = configuration["Cors"] ?? "http://localhost:9999";

            var allowedOrigins = cors.Split (new string[] { ";", "," }, StringSplitOptions.RemoveEmptyEntries);

            Console.WriteLine ("Allowed cors origins: " + cors);

            services.AddCors (options => {
                options.AddPolicy (PolicyName, config =>
                    config.WithOrigins (allowedOrigins)
                        .AllowAnyMethod ( )
                        .AllowAnyHeader ( )
                        .AllowCredentials ( ));
            });

            return services;
        }

        public static IApplicationBuilder UseAppCors(this IApplicationBuilder app) {

            app.UseCors (PolicyName);

            return app;
        }
    }
}
