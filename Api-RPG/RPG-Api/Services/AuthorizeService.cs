using mdRPG.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using mdRPG.Controllers;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using mdRPG.Controllers.Resources;

namespace mdRPG.Services
{
    public interface IAuthorizeService
    {
        string Authenticate(LoginModel loginModel, List<AccountResource> repository);
        Task<bool> CreateAdminAccount(LoginModel loginModel);
    }

    public class AuthorizeService : IAuthorizeService
    {
        private const string CollectionName = "AdministratorsCollection";
        private readonly IConfiguration _config;
        private AccountResource foundAccount;
        //private readonly List<AccountResource> _repository;

        public AuthorizeService(IConfiguration config)
        {
            _config = config;
           // _repository = repository;
        }

        public string Authenticate(LoginModel loginModel, List<AccountResource> repository)
        {
            if (CheckLoginAndPassword(loginModel, repository))
                return BuildToken(loginModel);

            return null;
        }

        private bool CheckLoginAndPassword(LoginModel loginModel, List<AccountResource> repository)
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
        }

        private string BuildToken(LoginModel loginModel)
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
        }

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

