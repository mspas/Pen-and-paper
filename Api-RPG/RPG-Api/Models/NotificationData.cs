using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class NotificationData
    {
        [ForeignKey("PersonalData")]
        public int Id { get; set; }
        public DateTime? lastMessageDate { get; set; }
        public DateTime? lastGameNotificationDate { get; set; }
        public DateTime? lastFriendNotificationDate { get; set; }
        public DateTime? lastMessageSeen { get; set; }
        public DateTime? lastGameNotificationSeen { get; set; }
        public DateTime? lastFriendNotificationSeen { get; set; }
    }

}