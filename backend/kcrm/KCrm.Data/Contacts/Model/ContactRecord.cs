using System;
using KCrm.Data.Common;

namespace KCrm.Data.Contacts.Model {
    public class ContactRecord : BaseIdModel {
        public string Data { get; set; }
        public string AvatarId { get; set; } = null;
        public DateTime Modify { get; set; }
    }
}
