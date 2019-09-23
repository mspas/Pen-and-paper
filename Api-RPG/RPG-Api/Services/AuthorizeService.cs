using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using RPG.Api.Resources;
using RPG.Api.Domain.Services.Security;
using RPG.Api.Domain.Services.Security.Tokens;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.Profile;

namespace RPG.Api.Domain.Services
{
    public class AuthorizeService : IAuthorizeService
    {
        private const string CollectionName = "AdministratorsCollection";
        private readonly IConfiguration _config;
        private readonly IAccountService _accountService;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ITokenHandler _tokenHandler;
        private AccountResource foundAccount;

        public AuthorizeService(IAccountService accountService, IPasswordHasher passwordHasher, ITokenHandler tokenHandler, IConfiguration config)
        {
            _accountService = accountService;
            _passwordHasher = passwordHasher;
            _tokenHandler = tokenHandler;
            _config = config;
        }

        //private readonly List<AccountResource> _repository;

        /*public string Authenticate(LoginModel loginModel)
        {
            if (CheckLoginAndPassword(loginModel, repository))
                return BuildToken(loginModel);

            return null;
        }*/


        /*public TokenResponse Authenticate(LoginModel loginModel)
        {
            var user = _accountService.FindByLoginAsync(loginModel.login);

            if (user == null || !_passwordHasher.PasswordMatches(loginModel.password, user.password))
            {
                return new TokenResponse(false, "Invalid login or password.", null);
            }
            else
            {
                BuildToken(loginModel.login);
            }

            var token = _tokenHandler.CreateAccessToken(user);

            return new TokenResponse(true, null, token);
        }*/
        public TokenResponse CreateAccessToken(LoginModel loginModel)
        {
            var user = _accountService.FindByLoginAsync(loginModel.login);

            if (user == null || !_passwordHasher.PasswordMatches(loginModel.password, user.password))
            {
                return new TokenResponse(false, "Invalid login or password.", null);
            }

            var token = _tokenHandler.CreateAccessToken(user);

            return new TokenResponse(true, null, token);
        }

        private string BuildToken(string login)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.UniqueName, login),
                new Claim("login", login)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(600),
              signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public TokenResponse RefreshTokenAsync(string refreshToken, string login)
        {
            var token = _tokenHandler.TakeRefreshToken(refreshToken);

            if (token == null)
            {
                return new TokenResponse(false, "Invalid refresh token.", null);
            }

            if (token.IsExpired())
            {
                return new TokenResponse(false, "Expired refresh token.", null);
            }

            var user = _accountService.FindByLoginAsync(login);
            if (user == null)
            {
                return new TokenResponse(false, "Invalid refresh token.", null);
            }

            var accessToken = _tokenHandler.CreateAccessToken(user);
            return new TokenResponse(true, null, accessToken);
        }

        public void RevokeRefreshToken(string refreshToken)
        {
            _tokenHandler.RevokeRefreshToken(refreshToken);
        }

        /*private bool CheckLoginAndPassword(LoginModel loginModel)
        {
            var entities = repository;
                foreach (AccountResource acc in entities)
                {
                    if (acc.login == loginModel.login && acc.password == loginModel.password)
                    {
                        foundAccount = acc;
                        return true;
                    }
                }
            return false;
        }*/

        /*private string BuildToken(LoginModel loginModel)
        {
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.UniqueName, loginModel.login),
                new Claim(JwtRegisteredClaimNames.NameId, foundAccount.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, foundAccount.email),
                new Claim("firstname", foundAccount.PersonalData.firstname),
                new Claim("lastname", foundAccount.PersonalData.lastname),
                new Claim("login", loginModel.login),
                new Claim("id", foundAccount.Id.ToString()),
                new Claim("city", foundAccount.PersonalData.city),
                new Claim("age", foundAccount.PersonalData.age.ToString()),
                new Claim("photoName", foundAccount.PersonalData.photoName.ToString()),
                new Claim("isPhotoUploaded", foundAccount.PersonalData.isPhotoUploaded.ToString())
            };

            // SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            //  var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(600));
          //    signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }*/

        public async Task<bool> CreateAdminAccount(LoginModel loginModel)
        {
            return true;
        }

        private bool LoginExist(LoginModel loginModel, List<AccountResource> repository)
        {
            var entities = repository;
            if (entities.Exists(p => p.login == loginModel.login))
                return true;

            return false;
        }
    }
}

