using System.Threading.Tasks;
using KCrm.Data.Files.Model;

namespace KCrm.Data.Files.Writer {
    public interface IFileWriter {

        Task<string> SaveFileAsync(FileRecord data);
    }
}
