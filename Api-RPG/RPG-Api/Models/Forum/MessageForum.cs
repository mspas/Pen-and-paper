using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class MessageForum
{
        public int Id { get; set; }
        public DateTime sendDdate { get; set; }
        public DateTime editDate { get; set; }
        public string bodyMessage { get; set; }
        public int senderId { get; set; }
        public int topicId { get; set; }
        public virtual Topic topic { get; set; }
    }
}
