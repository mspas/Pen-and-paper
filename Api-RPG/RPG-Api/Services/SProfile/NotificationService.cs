using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.Profile;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.Profile
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IUnitOfWork _unitOfWork;

        public NotificationService(INotificationRepository notificationRepository, IUnitOfWork unitOfWork)
        {
            _notificationRepository = notificationRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<NotificationData> GetNotificationDataAsync(int messageId)
        {
            return await _notificationRepository.GetNotificationDataAsync(messageId);
        }

        public async Task<BaseResponse> UpdateNotificationDataAsync(int id, NotificationData notificationData)
        {
            var toUpdate = await _notificationRepository.GetNotificationDataAsync(id);
            if (toUpdate == null)
            {
                return new BaseResponse(false, "Notification data not found");
            }

            toUpdate.lastMessageDate = notificationData.lastMessageDate;
            toUpdate.lastGameNotificationDate = notificationData.lastGameNotificationDate;
            toUpdate.lastFriendNotificationDate = notificationData.lastFriendNotificationDate;
            toUpdate.lastMessageSeen = notificationData.lastMessageSeen;
            toUpdate.lastGameNotificationSeen = notificationData.lastGameNotificationSeen;
            toUpdate.lastFriendNotificationSeen = notificationData.lastFriendNotificationSeen;

            var response = _notificationRepository.UpdateNotificationDataAsync(toUpdate);
            await _unitOfWork.CompleteAsync();
            return response;
        }
    }
}
