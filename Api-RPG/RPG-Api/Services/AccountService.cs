using RPG.Api.Domain.Models;
using RPG.Api.Domain.Models.Enums;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Services;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;

        public AccountService(IAccountRepository accountRepository, IUnitOfWork unitOfWork, IPasswordHasher passwordHasher)
        {
            _passwordHasher = passwordHasher;
            _unitOfWork = unitOfWork;
            _accountRepository = accountRepository;
        }

        public async Task<CreateAccountResponse> CreateUserAsync(Account account, params ERole[] userRoles)
        {
            var existingUser =  _accountRepository.FindByLoginAsync(account.login);
            if (existingUser != null)
            {
                return new CreateAccountResponse(false, "Email already in use.", null);
            }

            account.password = _passwordHasher.HashPassword(account.password);

            await _accountRepository.AddAsync(account, userRoles);
            await _unitOfWork.CompleteAsync();

            return new CreateAccountResponse(true, null, account);
        }

        public Account FindByLoginAsync(string login)
        {
            return _accountRepository.FindByLoginAsync(login);
        }
    }
}
