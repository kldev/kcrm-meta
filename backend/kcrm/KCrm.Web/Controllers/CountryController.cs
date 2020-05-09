using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KCrm.Data.Country.model;
using KCrm.Data.Country.Reader;
using KCrm.Web.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace KCrm.Web.Controllers {

    [Authorize]
    [ApiController]
    [Route("api/country")]
    public class CountryController : ControllerBase {
        private readonly ICountryReader _reader;

        public CountryController(ICountryReader reader) {
            _reader = reader;
        }


        [HttpPost]
        [Route("")]
        [SwaggerResponse (200, "The country list", typeof (List<CountryRecord>))]
        public async Task<IActionResult> Query([FromBody] QueryModel model) {

            if (model == null) model = new QueryModel ( );
            var result = await _reader.QueryListAsync (model.Query);

            return Ok (result);
        }
    }
}
