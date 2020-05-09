using System.Threading.Tasks;
using KCrm.Data.Contacts.Model;

namespace KCrm.Data.Contacts.Writer {
    public interface IContactWriter {
        Task<string> AddAsync(ContactData data, string avatarId = null);
        Task<bool> UpdateAsync(ContactRecord record);
    }
}
