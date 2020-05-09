using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace KCrm.Storage {
    public interface IMinioService {
        Task<string> GetFileAsync(string id, string bucketName, Stream output, CancellationToken token);
        Task<string> SaveFileAsync(Stream input, string id, string bucketName, string contentType, CancellationToken token);
    }
}
