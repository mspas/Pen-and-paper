using RPG.Api.Domain.Models;
using RPG.Api.Domain.Models.Enums;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Profile
{
    public interface IAccountService
    {
        Task<CreateAccountResponse> CreateUserAsync(Account user, params ERole[] userRoles);
        Account FindByLoginAsync(string login);
    }
}
