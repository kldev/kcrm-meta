using System;
using System.Data;
using System.Threading.Tasks;
using KCrm.Data.Contacts.Model;
using Dapper;
using KCrm.Data.Util;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.Contacts.Writer {
    public class ContactWriter : BaseDapperRepository, IContactWriter {


        public ContactWriter(IConnectionFactory factory, ILogger<ContactWriter> logger) : base (factory, logger) {

        }


        public async Task<string> AddAsync(ContactData data, string avatarId = null) {

            if (data == null) throw new ArgumentException (nameof (ContactData) + " can not be null");

            if (string.IsNullOrWhiteSpace (data.FirstName)) throw new ArgumentException (nameof (data.FirstName) + " can not be null or empty");
            if (string.IsNullOrWhiteSpace (data.LastName)) throw new ArgumentException (nameof (data.LastName) + " can not be null or empty");
            if (string.IsNullOrWhiteSpace (data.Email)) throw new ArgumentException (nameof (data.Email) + " can not be null or empty");

            using (var conn = _factory.Connection ( )) {

                var p = new DynamicParameters ( );
                p.Add ("data", JsonUtil.SerializeObject (data), DbType.String, ParameterDirection.Input);
                p.Add ("avatarId", avatarId, DbType.String, ParameterDirection.Input);
                p.Add ("newId", string.Empty, dbType: DbType.String, direction: ParameterDirection.Output);

                _logger.LogInformation ($"Execute procedure: api_Contacts_Insert with @data = {JsonUtil.SerializeObject (data)}");

                await conn.ExecuteAsync ("api_Contacts_Insert", p, commandType: CommandType.StoredProcedure);

                var newId = p.Get<string> ("newId");
                _logger.LogInformation ($"Record added: {newId}");

                return newId;
            }
        }

        public Task<bool> UpdateAsync(ContactRecord record) {
            return Task.FromResult (true);
        }
    }
}
