using System.Collections.Generic;

namespace KCrm.Web.Security {
    public struct AppRoles {
        public const string Root = "root";
        public const string User = "user";
        public const string Seller = "seller";
        public const string Customer = "customer";

        public static List<string> GetAllRoles() {
            return new List<string> { Root, User, Seller, Customer };
        }
    }

}
