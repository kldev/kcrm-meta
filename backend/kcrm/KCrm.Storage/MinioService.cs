using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Minio;

namespace KCrm.Storage {
    public class MinioService : IMinioService {

        private ILogger _logger;
        private MinioConfig _config { get; set; }

        public MinioService(ILogger<MinioService> logger, IConfiguration configuration) {

            _config = new MinioConfig {
                Endpoint = configuration["Minio:Endpoint"] ?? string.Empty,
                AccessKey = configuration["Minio:AccessKey"] ?? string.Empty,
                AccessPassword = configuration["Minio:AccessPassword"] ?? string.Empty,
            };
            _logger = logger;
        }

        public async Task<string> GetFileAsync(string id, string bucketName, Stream output, CancellationToken token) {

            var client = new MinioClient (_config.Endpoint, _config.AccessKey, _config.AccessPassword);

            if (token.IsCancellationRequested) return "Operation canceled";

            var result = await client.StatObjectAsync (bucketName, id, cancellationToken: token).ConfigureAwait (false);

            if (token.IsCancellationRequested) return "Operation canceled";

            if (result != null) {
                await client.GetObjectAsync (bucketName, id, async stream => {
                    if (token.IsCancellationRequested) return;
                    // https://github.com/minio/minio-dotnet/issues/338
                    // must be synchronous

                    stream.CopyTo (output);


                }, cancellationToken: token).ConfigureAwait (false);

                return "File streamed";
            }

            return "File not found";




        }

        public async Task<string> SaveFileAsync(Stream input, string id, string bucketName, string contentType, CancellationToken token) {
            var client = new MinioClient (_config.Endpoint, _config.AccessKey, _config.AccessPassword);

            if (await client.BucketExistsAsync (bucketName, token) == false) {
                await client.MakeBucketAsync (bucketName, cancellationToken: token);
            }

            // access length before close stream
            var length = input.Length;

            await client.PutObjectAsync (bucketName, id, input, length, contentType: contentType, cancellationToken: token);

            return "OK";
        }
    }
}
