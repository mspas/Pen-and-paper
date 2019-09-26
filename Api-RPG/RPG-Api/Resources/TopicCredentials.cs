using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class TopicCredentials
    {
        public int Id { get; set; }
        public int forumId { get; set; }
        public string topicName { get; set; }
        public string category { get; set; }
        public int authorId { get; set; }
        public bool isPublic { get; set; }
        public int messagesAmount { get; set; }
        public DateTime createDate { get; set; }
        public DateTime? lastActivityDate { get; set; }
        public int lastActivityUserId { get; set; }
        public int totalPages { get; set; }
    }
}
