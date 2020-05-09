using System.Collections.Generic;

namespace KCrm.Data.Contacts.Model {
    public class ContactData {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string Email { get; set; }

        public List<ContactPhone> Phones { get; set; } = new List<ContactPhone> ( );
    }

    public class ContactPhone {
        public string Phone { get; set; }
        public int Primary { get; set; } = 0;
    }
}
