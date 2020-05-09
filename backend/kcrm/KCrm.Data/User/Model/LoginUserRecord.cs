using System.Collections.Generic;

namespace KCrm.Data.User.Model {
    public class LoginUserRecord {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }

        public List<LoginUserRoleItem> Roles { get; set; } = new List<LoginUserRoleItem> ( );
    }

    public class LoginUserRoleItem {
        public string Name { get; set; }
    }
}
