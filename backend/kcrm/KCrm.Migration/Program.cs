using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Kcrm.Migration
{
    class Program
    {
        private static IConfigurationRoot s_configuration;
        private static IServiceProvider s_serviceProvider;
        
        static void Main(string[] args)
        {
            var serviceCollection = new ServiceCollection ( );
            ConfigureServices (serviceCollection);
            s_serviceProvider = serviceCollection.BuildServiceProvider ( );
            
            
            var stopwatch = new Stopwatch ( );
            stopwatch.Start ( );
            
            Console.WriteLine($"Connection string: ${s_configuration["ConnectionStrings:KCrmConnection"]}");
            
            var migrator = new Migrator (  );

            try {
                migrator.UpdateDatabase ( s_configuration);
            }
            catch (Exception ex) {
                Console.WriteLine($"Some error: {ex.Message}");
            }

            Console.WriteLine ("Program executed in: {0:hh\\:mm\\:ss} {1} ms", stopwatch.Elapsed,
                stopwatch.ElapsedMilliseconds);
        }
        
        private static void ConfigureServices(IServiceCollection serviceCollection) {
            // Add logging
            serviceCollection.AddSingleton (LoggerFactory.Create (builder => {
                builder
                    .AddConsole ( );
            }));

            serviceCollection.AddLogging ( );

            // Build configuration
            s_configuration = new ConfigurationBuilder ( )
                .SetBasePath (Directory.GetParent (AppContext.BaseDirectory).FullName)
                .AddJsonFile ("appsettings.json", false)
                .AddEnvironmentVariables()
                .Build ( );

            // Add access to generic IConfigurationRoot
            serviceCollection.AddSingleton (s_configuration);

        }
    }
}
