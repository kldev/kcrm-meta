using System.Threading.Tasks;

namespace KCrm.Data.Files.Reader {
    public interface IFileReader {
        Task<string> GetFileStoreIdAsync(string recordId);
    }
}
