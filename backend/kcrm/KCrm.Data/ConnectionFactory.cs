using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace KCrm.Data {
    public class ConnectionFactory : IConnectionFactory {

        private readonly IConfiguration _configuration;
        public ConnectionFactory(IConfiguration configuration) {

            _configuration = configuration;
        }


        public SqlConnection Connection() {
            var connectionString = this._configuration.GetConnectionString ("KCrmConnection") ?? "";
            return new SqlConnection (connectionString);
        }
    }
}
