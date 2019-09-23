using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class MessageResource
    {
        public int Id { get; set; }
        public DateTime sendDdate { get; set; }
        public bool wasSeen { get; set; }
        public string bodyMessage { get; set; }
        public int senderId { get; set; }
        public int relationId { get; set; }
    }
}
