using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services
{
    public interface IAuthorizeService
    {
        TokenResponse CreateAccessToken(LoginModel loginModel);
        Task<bool> CreateAdminAccount(LoginModel loginModel);
        TokenResponse RefreshTokenAsync(string refreshToken, string login);
        void RevokeRefreshToken(string revokeToken);
    }
}
