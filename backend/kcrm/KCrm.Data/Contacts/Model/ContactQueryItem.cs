using System.Collections.Generic;

namespace KCrm.Data.Contacts.Model {
    public class ContactQueryItem {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public List<ContactPhone> Phones { get; set; } = new List<ContactPhone> ( );
        public string Country { get; set; }
    }
}
