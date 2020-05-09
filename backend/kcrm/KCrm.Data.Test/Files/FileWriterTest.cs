using System;
using KCrm.Data.Files.Model;
using KCrm.Data.Files.Writer;
using NUnit.Framework;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.Test.Files {
    public class FileWriterTest {
        private IFileWriter _writer;

        [SetUp]
        public void Setup() {

            var loggerFactory = TestHelper.CreateLogger ( );
            _writer = new FileWriter (new TestConnectionFactory ( ), loggerFactory.CreateLogger<FileWriter> ( ));
        }

        [Test]
        public void Should_Save_File() {

            var record = new FileRecord ( ) {
                Metadata = new FileMetadata ( ) { ContentType = "image/png", FileSize = 1048033 },
                OriginalName = "testfile.png",
                StoreId = Guid.NewGuid ( ).ToString ("D")
            };

            var id = _writer.SaveFileAsync (record).Result;

            Assert.IsNotNull (id);
            Assert.IsNotEmpty (id);
        }

        [Test]
        public void Should_Failed_When_OriginalNameMissing() {

            var record = new FileRecord ( ) {
                Metadata = new FileMetadata ( ) { ContentType = "image/png", FileSize = 1048033 },
                OriginalName = string.Empty,
                StoreId = Guid.NewGuid ( ).ToString ("D")
            };

            var ex = Assert.ThrowsAsync (Is.TypeOf<ArgumentException> ( ), async () => {
                await _writer.SaveFileAsync (record);
            });


        }
    }
}
