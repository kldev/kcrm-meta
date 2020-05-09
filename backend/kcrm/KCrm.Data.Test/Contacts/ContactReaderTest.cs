using System.Collections.Generic;
using KCrm.Data.Contacts.Model;
using KCrm.Data.Contacts.Reader;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NUnit.Framework;

namespace KCrm.Data.Test.Contacts {
    public class ContactReaderTest {
        private IContactReader _reader;

        [SetUp]
        public void Setup() {

            var loggerFactory = TestHelper.CreateLogger ( );
            _reader = new ContactReader (new TestConnectionFactory ( ), loggerFactory.CreateLogger<ContactReader> ( ));
        }

        [Test]
        public void Can_Query_Json_List() {

            var result = _reader.GetListAsync (null).Result;

            Assert.IsNotNull (result);
            Assert.IsNotEmpty (result);

            var list = JsonConvert.DeserializeObject<List<ContactQueryItem>> (result);

            Assert.IsTrue (list.Count > 0);
            Assert.IsNotEmpty (list[0].Name);
            Assert.IsNotEmpty (list[0].Id);

        }


        [Test]
        public void Can_Query_Json_List_For_Alice() {

            var result = _reader.GetListAsync ("Alice", 0, 1).Result;

            Assert.IsNotNull (result);
            Assert.IsNotEmpty (result);

            var list = JsonConvert.DeserializeObject<List<ContactQueryItem>> (result);

            Assert.IsTrue (list.Count == 1);
            Assert.IsNotEmpty (list[0].Name);
            Assert.IsNotEmpty (list[0].Id);
            Assert.IsTrue (list[0].Surname.Equals ("Coben"));

        }
    }
}
