using System;
using System.Reflection;
using System.Threading.Tasks;
using DbUp;
using Microsoft.Extensions.Configuration;

namespace Kcrm.Migration {
    public class Migrator {

        private string _connectionString;
        
        public void UpdateDatabase(IConfiguration configuration) {
            _connectionString = configuration["ConnectionStrings:KCrmConnection"];

            // DropDatabase.For.SqlDatabase (_connectionString);
            EnsureDatabase.For.SqlDatabase (_connectionString);
            
            var upgradeEngineBuilder = DeployChanges.To
                .SqlDatabase(_connectionString, null)
                .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
                .WithTransaction()
                .LogToConsole();
 
            var upgradeEngine = upgradeEngineBuilder.Build();
            if (upgradeEngine.IsUpgradeRequired ( )) {
                var result = upgradeEngine.PerformUpgrade ( );
                Console.WriteLine("Result: " + result.Successful);

                if (!result.Successful) {
                    Console.WriteLine("Database update failed");
                }
            }
        }
    }
}
