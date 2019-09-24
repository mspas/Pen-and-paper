using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories.Profile;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.Profile
{
    public class NotificationRepository : BaseRepository, INotificationRepository
    {
        public NotificationRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<NotificationData> GetNotificationDataAsync(int messageId)
        {
            return await _context.NotificationsData.FirstAsync(mbox => mbox.Id == messageId);
        }

        public BaseResponse UpdateNotificationDataAsync(NotificationData notificationData)
        {
            _context.NotificationsData.Update(notificationData);
            return new BaseResponse(true, null);
        }
    }
}
