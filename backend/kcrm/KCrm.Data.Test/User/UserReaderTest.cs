using KCrm.Data.User.Reader;
using NUnit.Framework;
using Microsoft.Extensions.Logging;

namespace KCrm.Data.Test.User {
    public class UserReaderTest {

        private IUserReader _reader;

        [SetUp]
        public void Setup() {

            var loggerFactory = TestHelper.CreateLogger ( );
            _reader = new UserReader (new TestConnectionFactory ( ), loggerFactory.CreateLogger<UserReader> ( ));
        }


        [Test]
        public void Should_Login_Root() {

            var result = _reader.LoginUserAsync ("root", "secret").Result;

            Assert.IsNotNull (result);
            Assert.IsNotEmpty (result.Name);
            Assert.IsTrue (result.Roles.Count > 0);
        }


        [Test]
        public void Should_Failed_When_Wrong_Password_Login_Root() {

            var result = _reader.LoginUserAsync ("root", "wrong-password").Result;

            Assert.IsNull (result);

        }
    }
}
