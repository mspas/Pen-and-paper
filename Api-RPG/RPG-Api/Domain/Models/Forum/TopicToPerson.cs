using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class TopicToPerson
    {
        public int Id { get; set; }
        public int forumId { get; set; }
        public int topicId { get; set; }
        public int userId { get; set; }
        public DateTime? lastActivitySeen { get; set; }
        public virtual Topic Topic { get; set; }
        public virtual NotificationData UserNotificationData { get; set; }

        public TopicToPerson(int forumId, int topicId, int userId)
        {
            this.forumId = forumId;
            this.topicId = topicId;
            this.userId = userId;
            lastActivitySeen = null;
        }
        public TopicToPerson()
        {
        }
        public TopicToPerson(int forumId, int topicId, int userId, DateTime lastActivitySeen)
        {
            this.forumId = forumId;
            this.topicId = topicId;
            this.userId = userId;
            this.lastActivitySeen = lastActivitySeen;
        }
    }
}
