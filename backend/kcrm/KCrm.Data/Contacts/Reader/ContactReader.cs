using System.Data;
using System.Threading.Tasks;
using Dapper;
using KCrm.Data.Util;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.Contacts.Reader {
    public class ContactReader : BaseDapperRepository, IContactReader {

        public ContactReader(IConnectionFactory factory, ILogger<ContactReader> logger) : base (factory, logger) {

        }

        public async Task<string> GetListAsync(string query, int offset = 0, int limit = 100) {
            using (var conn = _factory.Connection ( )) {
                var p = new DynamicParameters ( );
                p.Add ("query", query, DbType.String, ParameterDirection.Input);
                p.Add ("offset", offset, DbType.Int64, ParameterDirection.Input);
                p.Add ("limit", limit, dbType: DbType.Int32, direction: ParameterDirection.Input);

                _logger.LogInformation (
                    $"Execute procedure: api_Contacts_Query with @query = {query}");

                var result = await conn.ExecuteScalarAsync<string> ("api_Contacts_Query", p, commandType: CommandType.StoredProcedure);

                return result;

            }
        }
    }
}
