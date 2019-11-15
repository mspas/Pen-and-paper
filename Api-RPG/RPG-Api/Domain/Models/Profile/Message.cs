using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class Message
    {
        public int Id { get; set; }
        public DateTime sendDdate { get; set; }
        public bool wasSeen { get; set; }
        public string bodyMessage { get; set; }
        public int senderId { get; set; }
        public int relationId { get; set; }
        public bool isPhoto { get; set; }
        public Photo photo { get; set; }
        public virtual Friend relation { get; set; }
    }
}
