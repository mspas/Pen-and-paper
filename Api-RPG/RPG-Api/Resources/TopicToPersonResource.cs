using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class TopicToPersonResource
    {
        public int Id { get; set; }
        public int forumId { get; set; }
        public int topicId { get; set; }
        public int userId { get; set; }
        public DateTime? lastActivitySeen { get; set; }
        public Topic Topic { get; set; }
        public NotificationData UserNotificationData { get; set; }
    }
}
