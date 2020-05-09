using System.Data;
using System.Threading.Tasks;
using Dapper;
using KCrm.Data.User.Model;
using KCrm.Data.Util;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.User.Reader {
    public class UserReader : BaseDapperRepository, IUserReader {

        public UserReader(IConnectionFactory connectionFactory, ILogger<UserReader> logger) : base (connectionFactory, logger) { }

        public async Task<LoginUserRecord> LoginUserAsync(string username, string password) {
            using (var conn = _factory.Connection ( )) {
                var p = new DynamicParameters ( );
                p.Add ("username", username, DbType.String, ParameterDirection.Input);
                p.Add ("password", password, DbType.String, ParameterDirection.Input);

                _logger.LogInformation (
                    $"Execute procedure: api_LoginUser with @username = {username}");

                var result = await conn.ExecuteScalarAsync<string> ("api_LoginUser", p, commandType: CommandType.StoredProcedure);

                if (!string.IsNullOrEmpty (result)) {
                    return JsonUtil.DeserializeObject<LoginUserRecord> (result);
                }

                return null;

            }
        }
    }
}
