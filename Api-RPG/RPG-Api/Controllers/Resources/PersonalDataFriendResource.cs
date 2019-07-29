using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Controllers.Resources
{
    public class PersonalDataFriendResource
{
    public int Id { get; set; }
    public PersonalDataResource PersonalData { get; set; }
    public bool isAccepted { get; set; }
    public bool isReceiver { get; set; }
    public bool isFriendRequest { get; set; }
    public DateTime? lastMessageDate { get; set; }

        public PersonalDataFriendResource(int id, PersonalDataResource pd, bool isA, bool isR, bool isFR, DateTime? last)
        {
            Id = id;
            PersonalData = pd;
            isAccepted = isA;
            isReceiver = isR;
            isFriendRequest = isFR;
            lastMessageDate = last;
        }
    }
}
