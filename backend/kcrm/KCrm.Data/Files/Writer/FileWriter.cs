using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using KCrm.Data.Common;
using KCrm.Data.Files.Model;
using KCrm.Data.Util;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.Files.Writer {
    public class FileWriter : BaseDapperRepository, IFileWriter {

        public FileWriter(IConnectionFactory factory, ILogger<FileWriter> logger) : base (factory, logger) {

        }


        public async Task<string> SaveFileAsync(FileRecord data) {
            if (data == null) throw new ArgumentException (nameof (FileRecord) + " can not be null");

            if (string.IsNullOrWhiteSpace (data.OriginalName)) throw new ArgumentException (nameof (data.OriginalName) + " can not be null or empty");
            if (string.IsNullOrWhiteSpace (data.StoreId)) throw new ArgumentException (nameof (data.StoreId) + " can not be null or empty");

            using (var conn = _factory.Connection ( )) {

                var p = new DynamicParameters ( );
                p.Add ("originalName", data.OriginalName, DbType.String, ParameterDirection.Input);
                p.Add ("metadata", JsonUtil.SerializeObject (data.Metadata), DbType.String, ParameterDirection.Input);
                p.Add ("storeId", data.StoreId, DbType.String, ParameterDirection.Input);


                _logger.LogInformation ($"Execute procedure: api_File_Insert with data = {JsonUtil.SerializeObject (data)}");
                return await conn.ExecuteScalarAsync<string> ("api_File_Insert", p, commandType: CommandType.StoredProcedure);

                //   var newId = (await conn.QueryAsync<RecordAdded> ("api_File_Insert", p, commandType: CommandType.StoredProcedure)).ToList ( ).FirstOrDefault ( );

                // _logger.LogInformation ($"Record added: {JsonUtil.SerializeObject (newId)}");

                //return newId?.Id;
            }
        }
    }
}
