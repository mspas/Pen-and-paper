using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class FriendResource
    {
        public int Id { get; set; }
        public PersonalDataResource PersonalData { get; set; }
        public bool isAccepted { get; set; }
        public bool isFriendRequest { get; set; }
        public DateTime? lastMessageDate { get; set; }
        public bool isReceiver { get; set; }
    }
}
