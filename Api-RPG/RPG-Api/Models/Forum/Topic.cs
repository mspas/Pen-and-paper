using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class Topic
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
        public virtual Forum forum { get; set; }
        public virtual ICollection<MessageForum> Messages { get; set; }
        public virtual ICollection<TopicToPerson> UsersConnected { get; set; }
    }

    public class CreateTopic
    {
        public Topic topic { get; set; }
        public string bodyMessage { get; set; }
    }

}
