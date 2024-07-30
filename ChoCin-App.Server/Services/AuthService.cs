using ChoCin_App.Entities;
using ChoCin_App.Server.Models;
using ChoCin_App.Server.Models.Auth;
using ChoCin_App.Server.Models.Form;
using ChoCin_App.Server.Models.Group;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ChoCin_App.Server.Services
{
    public class AuthService
    {
        private readonly DefaultDbContext dbContext;
        private readonly AppSettings appSettings;

        public AuthService(DefaultDbContext _context, IOptions<AppSettings> _appSettings)
        {
            this.dbContext = _context;
            this.appSettings = _appSettings.Value;
        }

        public async Task<JwtAuthResponse?> Authenticate(AuthInput model)
        {
            var tmpUser = await this.dbContext
                .CUsers
                .AsNoTracking()
                .Where(q => q.Username == model.UserName)
                .FirstOrDefaultAsync();

            if (tmpUser == null) { return null; }

            var validatePassword = this.CheckingPassword(model.Password, tmpUser.UserPassword);

            // return null if user not found
            if (!validatePassword) return null;

            // authentication successful so generate jwt token
            var token = await generateJwtToken(tmpUser.UserId);

            JwtAuthResponse response = await this.dbContext
                .CUsers
                .AsNoTracking()
                .Where(W => W.UserId == tmpUser.UserId)
                .Select(Q => new JwtAuthResponse
                {
                    Id = Q.UserId,
                    Username = Q.Username,
                    FullName = Q.UserFullName,
                    Token = token,
                    Groups = Q.Groups
                        .Select(G => new GroupModel
                        {
                            GroupId = G.GroupId,
                            GroupName = G.GroupName,
                        }).ToList()
                }).FirstAsync();

            return response;
        }

        // helper methods
        private async Task<string> generateJwtToken(Guid userId)
        {
            //Generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = await Task.Run(() =>
            {
                var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("id", userId.ToString()) }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                return tokenHandler.CreateToken(tokenDescriptor);
            });

            return tokenHandler.WriteToken(token);
        }

        private bool CheckingPassword(string enteredPasword, string hashedPassword)
        {
            bool valid = BCrypt.Net.BCrypt.Verify(enteredPasword, hashedPassword);

            return valid;
        }
    }
}