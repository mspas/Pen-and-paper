using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class MessageForum
{
        public MessageForum(DateTime sendDdate, string bodyMessage, int senderId, int pageNumber)
        {
            this.sendDdate = sendDdate;
            this.bodyMessage = bodyMessage;
            this.senderId = senderId;
            this.pageNumber = pageNumber;
        }
        public MessageForum()
        {

        }

        public int Id { get; set; }
        public DateTime sendDdate { get; set; }
        public DateTime? editDate { get; set; }
        public string bodyMessage { get; set; }
        public int senderId { get; set; }
        public int topicId { get; set; }
        public int pageNumber { get; set; }
        public bool isPhoto { get; set; }
        public virtual Topic topic { get; set; }
        public virtual ICollection<Photo> photos { get; set; }


    }
}
