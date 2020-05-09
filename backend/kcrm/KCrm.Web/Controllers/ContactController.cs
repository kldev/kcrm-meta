using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KCrm.Data.Contacts.Model;
using KCrm.Data.Contacts.Reader;
using KCrm.Data.Contacts.Writer;
using KCrm.Data.Util;
using KCrm.Web.ViewModel;
using KCrm.Web.ViewModel.Common;
using KCrm.Web.ViewModel.Contact;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace KCrm.Web.Controllers {

    [Authorize]
    [Route ("api/contact/[action]")]
    [ApiController]
    public class ContactController : ControllerBase {
        private IContactReader _reader;
        private IContactWriter _writer;

        public ContactController(IContactReader reader, IContactWriter writer) {
            _reader = reader;
            _writer = writer;
        }

        [HttpGet]
        [SwaggerResponse (200, "The contact list", typeof (List<ContactQueryItem>))]
        public async Task<IActionResult> List() {

            var result = await _reader.GetListAsync (null);

            return Ok (result);
        }

        [SwaggerResponse (200, "The contact list", typeof (List<ContactQueryItem>))]
        [HttpPost]
        public async Task<IActionResult> Query([FromBody]QueryModel model) {

            var result = await _reader.GetListAsync (model.Query);

            return Ok (result);
        }

        [SwaggerResponse (200, "New record id", typeof (RecordSavedModel))]
        [SwaggerResponse (500, "Bad request", typeof (ErrorResponseModel))]
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] QuerySaveModel model) {

            // TODO: should this logic be in controller

            if (string.IsNullOrEmpty (model.Id)) {
                var result = await _writer.AddAsync (model.Data, null);

                return Ok (new RecordSavedModel { Id = result });
            }
            else {
                await _writer.UpdateAsync (new ContactRecord {
                    Id = model.Id,
                    Data = JsonUtil.SerializeObject (model.Data),
                    Modify = DateTime.UtcNow,
                    AvatarId = null
                });
            }

            return Ok (new RecordSavedModel { Id = model.Id });
        }
    }
}
