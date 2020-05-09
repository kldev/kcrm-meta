using System.Data.SqlClient;

namespace KCrm.Data {
    public interface IConnectionFactory {
        SqlConnection Connection();
    }
}
