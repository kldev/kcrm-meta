using System.Threading.Tasks;
using KCrm.Data.User.Model;

namespace KCrm.Data.User.Reader {
    public interface IUserReader {

        Task<LoginUserRecord> LoginUserAsync(string username, string password);
    }
}
