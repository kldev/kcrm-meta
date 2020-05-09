using System.Threading.Tasks;

namespace KCrm.Data.Contacts.Reader {
    public interface IContactReader {

        Task<string> GetListAsync(string query, int offset = 0, int count = 100);
    }
}
