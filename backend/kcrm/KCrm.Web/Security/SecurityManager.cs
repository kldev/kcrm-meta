using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using KCrm.Data.User.Reader;
using KCrm.Web.ViewModel.Login;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace KCrm.Web.Security {
    public class SecurityManager : ISecurityManager {
        private readonly IUserReader _reader;
        private readonly ILogger<SecurityManager> _logger;
        private readonly IConfiguration _configuration;        

        public SecurityManager(IUserReader reader, ILogger<SecurityManager> logger, IConfiguration configuration) {
            _reader = reader;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task<LoginResponseModel> Authenticate(string username, string password) {

            if (string.IsNullOrEmpty (username) || string.IsNullOrEmpty (password)) throw new ArgumentException ("Username or password ivalid");

            var user = await _reader.LoginUserAsync (username, password);

            if (user == null) {
                _logger.LogInformation ($"Authenticate user faild with name {username}");
                return null;
            }

            _logger.LogInformation ($"Security key: {_configuration["JwtSecurityToken"]}");

            var tokenHandler = new JwtSecurityTokenHandler ( );
            var key = Encoding.ASCII.GetBytes (_configuration["JwtSecurityToken"]);

            var claims = new List<Claim>
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim(ClaimTypes.Name, username),
                };



            foreach (var role in user.Roles) {
                if (AppRoles.GetAllRoles ( ).IndexOf (role.Name.ToLower ( )) > -1) {
                    claims.Add (new Claim (ClaimTypes.Role, role.Name.ToLower ( )));
                }
            }

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (claims),
                Expires = DateTime.UtcNow.AddDays (7),
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken (tokenDescriptor);

            return new LoginResponseModel { Token = tokenHandler.WriteToken (token), Fullname = $"{user.Name} {user.Surname}".Trim() };
        }
    }
}
