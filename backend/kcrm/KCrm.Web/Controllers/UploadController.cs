using System;
using System.IO;
using System.Threading.Tasks;
using KCrm.Data.Files.Model;
using KCrm.Data.Files.Writer;
using KCrm.Storage;
using KCrm.Web.ViewModel.Common;
using KCrm.Web.ViewModel.File;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace KCrm.Web.Controllers {

    [Authorize]
    [ApiExplorerSettings (IgnoreApi = true)]
    public class UploadController : ControllerBase {
        private readonly IMinioService _minioService;
        private readonly IFileWriter _fileWriter;
        private ILogger _logger;

        public UploadController(IMinioService minioService, IFileWriter fileWriter, ILogger<UploadController> logger) {
            _minioService = minioService;
            _logger = logger;
            _fileWriter = fileWriter;
        }

        [Route ("api/upload")]
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm] UploadModel model) {

            var errorMessage = "unexpected error";

            if (model.File != null) {
                _logger.LogInformation ($"Upload file: {model.File.Name}, {model.File.ContentType}");

                if (model.File != null && model.File.ContentType.StartsWith ("image/")) {
                    var maxFileSize = 6 * 1024 * 1024; // 6 * 1KB * 1024 B
                    var saveStream = model.File.OpenReadStream ( );


                    if (saveStream.Length < maxFileSize) {
                        var storeId = Guid.NewGuid ( ).ToString ("D");
                        var recordId = await _fileWriter.SaveFileAsync (new FileRecord ( ) {
                            OriginalName = model.File.Name,
                            Metadata = new FileMetadata ( ) {
                                ContentType = model.File.ContentType,
                                FileSize = saveStream.Length
                            },
                            StoreId = storeId
                        });

                        await _minioService.SaveFileAsync (saveStream, storeId, "avatars", model.File.ContentType,
                            HttpContext.RequestAborted);

                        return Ok (new IdResponseModel { Id = recordId });
                    }

                    errorMessage = $"6MB file size limit exceed. File not saved";
                }
                else {
                    errorMessage = $"Only picture file allowed or file is missing";
                }


            }

            return BadRequest (errorMessage);
        }

    }
}
