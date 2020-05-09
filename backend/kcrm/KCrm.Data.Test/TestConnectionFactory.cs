using System.Data.SqlClient;

namespace KCrm.Data.Test {
    public class TestConnectionFactory : IConnectionFactory {
        public SqlConnection Connection() {
            return new SqlConnection ("Server=127.0.0.1,12330;Database=kcrm;User ID=sa;Password=VeryStrongPass@");
        }
    }
}
