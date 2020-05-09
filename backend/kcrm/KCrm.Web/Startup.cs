using System.Reflection;
using KCrm.Data;
using KCrm.Storage;
using KCrm.Web.Middleware;
using KCrm.Web.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace KCrm.Web {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {

            services.Configure<KestrelServerOptions> (options => {
                options.AllowSynchronousIO = true;
            });

            // If using IIS:
            services.Configure<IISServerOptions> (options => {
                options.AllowSynchronousIO = true;
            });

            // scan for classes and register automatically

            services.Scan (scan => {

                scan.FromAssemblies (Assembly.GetAssembly (typeof (IMinioService)))
                    .AddClasses (classes => classes.AssignableTo<IMinioService> ( ))
                    .AsMatchingInterface ( ).WithScopedLifetime ( );


                scan.FromAssemblies (Assembly.GetAssembly (typeof (IConnectionFactory)))
                    .AddClasses (classes => classes.AssignableTo<IConnectionFactory> ( ))
                    .AsMatchingInterface ( ).WithScopedLifetime ( )
                    .AddClasses ( )
                    .AsMatchingInterface ( ).WithScopedLifetime ( );

            });

            services.AddScoped<ISecurityManager, SecurityManager> ();
            services.AddControllers ( );

            services.AddAppCors (Configuration);
            services.AddSwaggerService ( );

            services.AddJwtService (Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ( )) {
                app.UseDeveloperExceptionPage ( );
            }


            app.UseAppCors ( );
            app.UseHttpsRedirection ( );

            app.UseMachineIdMiddleware ( );
            app.UseErrorHandlingMiddleware ( );

            app.AddSwaggerApplication ( );

            app.UseRouting ( );
            app.UseAuthentication ( );
            app.UseAuthorization ( );

          

            app.UseEndpoints (endpoints => {

                endpoints.UseMinioService ( );

                endpoints.MapControllers ( );
            });
        }
    }
}
