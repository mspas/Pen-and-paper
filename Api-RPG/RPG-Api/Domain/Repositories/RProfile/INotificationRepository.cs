using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.Profile
{
    public interface INotificationRepository
    {
        Task<NotificationData> GetNotificationDataAsync(int userId);
        BaseResponse UpdateNotificationDataAsync(NotificationData notificationData);
    }
}
