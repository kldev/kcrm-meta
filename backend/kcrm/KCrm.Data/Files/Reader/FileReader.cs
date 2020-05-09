using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.Files.Reader {
    public class FileReader : BaseDapperRepository, IFileReader {

        public FileReader(IConnectionFactory factory, ILogger<FileReader> logger) : base (factory, logger) {

        }

        public async Task<string> GetFileStoreIdAsync(string recordId) {
            if (string.IsNullOrEmpty (recordId)) throw new ArgumentException ("Record id can not be null");

            using (var conn = _factory.Connection ( )) {

                var p = new DynamicParameters ( );
                p.Add ("id", recordId, DbType.String, ParameterDirection.Input);

                _logger.LogInformation ($"Execute procedure: api_File_GetStoreId with data = {recordId}");
                return await conn.ExecuteScalarAsync<string> ("api_File_GetStoreId", p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
