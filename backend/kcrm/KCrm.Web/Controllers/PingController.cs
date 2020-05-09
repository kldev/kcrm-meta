using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KCrm.Web.Controllers {
    [ApiExplorerSettings (IgnoreApi = true)]
    public class PingController : ControllerBase {

        [AllowAnonymous]
        [Route ("api/ping")]
        public IActionResult Pong() => Ok ("Pong");
    }
}
