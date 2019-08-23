using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class Friend
    {
        public int Id { get; set; }
        public int player1Id { get; set; }
        public int player2Id { get; set; }
        public bool isAccepted { get; set; }
        public bool isFriendRequest { get; set; }
        public DateTime? lastMessageDate { get; set; }
        public virtual PersonalData player1 { get; set; }
        public virtual PersonalData player2 { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}
