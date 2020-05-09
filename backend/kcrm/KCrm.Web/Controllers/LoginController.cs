using System.Threading.Tasks;
using KCrm.Web.Security;
using KCrm.Web.ViewModel.Common;
using KCrm.Web.ViewModel.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KCrm.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ISecurityManager _securityManager;

        public LoginController(ISecurityManager securityManager) {
            _securityManager = securityManager;
        }

        [AllowAnonymous]
        [Route("")]
        [HttpPost]
        public async Task<IActionResult> UserLogin([FromBody]LoginModel model) {

            var result = await _securityManager.Authenticate (model.Username, model.Password);

            if (result == null || string.IsNullOrEmpty(result.Token)) {
                return Unauthorized (new ErrorResponseModel ( ) {  Error = "username or password invalid"});
            }

            return Ok (result);

        } 
    }
}
