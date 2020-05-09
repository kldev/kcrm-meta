using System.Threading.Tasks;
using KCrm.Web.ViewModel.Login;

namespace KCrm.Web.Security {
    public interface ISecurityManager {
        public Task<LoginResponseModel> Authenticate(string username, string password);
    }
}
