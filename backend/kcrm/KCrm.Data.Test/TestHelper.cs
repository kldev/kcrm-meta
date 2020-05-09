using Microsoft.Extensions.Logging;

namespace KCrm.Data.Test {
    public static class TestHelper {

        public static ILoggerFactory CreateLogger() {
            var loggerFactory = LoggerFactory.Create (builder => {
                builder.AddFilter ("Microsoft", LogLevel.Warning)
                    .AddFilter ("System", LogLevel.Warning)
                    .AddFilter ("KCrm.Data", LogLevel.Debug)
                    .AddConsole ( );
            }
            );

            return loggerFactory;
        }
    }
}
