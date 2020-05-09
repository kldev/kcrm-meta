using KCrm.Data.Contacts.Model;

namespace KCrm.Web.ViewModel.Contact {
    public class QuerySaveModel {
        public string Id { get; set; } = string.Empty;
        public ContactData Data { get; set; } = new ContactData ( );

    }
}
