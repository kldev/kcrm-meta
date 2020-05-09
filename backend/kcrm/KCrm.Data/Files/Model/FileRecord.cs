using System;
using KCrm.Data.Common;

namespace KCrm.Data.Files.Model {
    public class FileRecord : BaseIdModel {
        public string OriginalName { get; set; }
        public FileMetadata Metadata { get; set; }
        public DateTime Created { get; set; }
        public string StoreId { get; set; }
    }
}
