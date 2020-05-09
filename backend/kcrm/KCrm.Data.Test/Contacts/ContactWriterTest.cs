using System;
using System.Collections.Generic;
using KCrm.Data.Contacts.Model;
using KCrm.Data.Contacts.Writer;
using Microsoft.Extensions.Logging;
using NUnit.Framework;

namespace KCrm.Data.Test.Contacts {

    public class ContactWriterTest {
        private IContactWriter _writer;

        [SetUp]
        public void Setup() {

            var loggerFactory = TestHelper.CreateLogger ( );
            _writer = new ContactWriter (new TestConnectionFactory ( ), loggerFactory.CreateLogger<ContactWriter> ( ));
        }

        [Test]
        public void Should_Add_Random_Contact() {

            var data = new ContactData {
                Country = "PL",
                FirstName = "TestRun",
                LastName = "LastName",
                Email = "test@company.co",
                Phones = new List<ContactPhone> {
                    new ContactPhone { Phone = "44600700701", Primary = 1},
                    new ContactPhone { Phone = "44600700702", Primary = 0},
                    new ContactPhone { Phone = "44600700703", Primary = 0}
                }
            };

            var result = _writer.AddAsync (data, null).Result;

            Assert.IsNotEmpty (result);
            Assert.IsTrue (Guid.Parse (result) != null);
        }

        [Test]
        public void Should_Failed_On_Missing_Data_FirstName() {



            Assert.ThrowsAsync (Is.TypeOf<ArgumentException> ( ).And.Message.Contains ("FirstName"), async () => {
                var data = new ContactData {
                    Country = "PL",
                    FirstName = "",
                    LastName = "LastName",
                    Email = "test@company.co",
                    Phones = new List<ContactPhone> {
                        new ContactPhone {Phone = "44600700701", Primary = 1},
                        new ContactPhone {Phone = "44600700702", Primary = 0},
                        new ContactPhone {Phone = "44600700703", Primary = 0}
                    }
                };

                var result = await _writer.AddAsync (data, null);

                Assert.IsEmpty (result);

            });


        }

        [Test]
        public void Should_Failed_On_Missing_Data_Email() {



            Assert.Throws (typeof (AggregateException), () => {
                var data = new ContactData {
                    Country = "PL",
                    FirstName = "Alice",
                    LastName = "LastName",
                    Email = "",
                    Phones = new List<ContactPhone> {
                        new ContactPhone {Phone = "44600700701", Primary = 1},
                        new ContactPhone {Phone = "44600700702", Primary = 0},
                        new ContactPhone {Phone = "44600700703", Primary = 0}
                    }
                };

                var result = _writer.AddAsync (data, null).Result;

                Assert.IsEmpty (result);

            });


        }
    }
}
