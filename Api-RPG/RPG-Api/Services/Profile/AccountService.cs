using RPG.Api.Domain.Models;
using RPG.Api.Domain.Models.Enums;
using RPG.Api.Domain.Repositories.Profile;
using RPG.Api.Domain.Services.Profile;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Repositories;

namespace RPG.Api.Services.Profile
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _accountRepository;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher _passwordHasher;

        public AccountService(IAccountRepository accountRepository, INotificationRepository notificationRepository, IUnitOfWork unitOfWork, IPasswordHasher passwordHasher)
        {
            _accountRepository = accountRepository;
            _notificationRepository = notificationRepository;
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
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

            var notificationEmpty = await _notificationRepository.GetNotificationDataAsync(account.Id);
            var notificationDefault = SetDefaultData(notificationEmpty);
            _notificationRepository.UpdateNotificationDataAsync(notificationDefault);
            await _unitOfWork.CompleteAsync();

            return new CreateAccountResponse(true, null, account);
        }

        public Account FindByLoginAsync(string login)
        {
            return _accountRepository.FindByLoginAsync(login);
        }



        private NotificationData SetDefaultData(NotificationData notification)
        {
            notification.lastFriendNotificationDate = DateTime.Now;
            notification.lastFriendNotificationSeen = DateTime.Now;
            notification.lastGameNotificationDate = DateTime.Now;
            notification.lastGameNotificationSeen = DateTime.Now;
            notification.lastMessageDate = DateTime.Now;
            notification.lastMessageSeen = DateTime.Now;

            return notification;
        }
    }
}
