using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.Country.Reader {
    public class CountryReader : BaseDapperRepository, ICountryReader {

        public CountryReader(IConnectionFactory factory, ILogger<CountryReader> logger) : base(factory, logger) {

        }

        public async Task<string> QueryListAsync(string query) {
            using (var conn = _factory.Connection ( )) {
                var p = new DynamicParameters ( );
                p.Add ("query", query, DbType.String, ParameterDirection.Input);

                _logger.LogInformation (
                    $"Execute procedure: api_Country_Query with @query = {query}");

                return await conn.ExecuteScalarAsync<string> ("api_Country_Query", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
