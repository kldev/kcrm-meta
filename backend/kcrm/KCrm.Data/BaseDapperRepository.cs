using Dapper;
using Microsoft.Extensions.Logging;

namespace KCrm.Data {
    public abstract class BaseDapperRepository {

        protected readonly IConnectionFactory _factory;
        protected readonly ILogger _logger;

        protected BaseDapperRepository(IConnectionFactory factory, ILogger logger) {
            _factory = factory;
            _logger = logger;
        }
    }
}
