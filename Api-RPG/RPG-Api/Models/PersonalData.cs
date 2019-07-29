using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class PersonalData
    {
        [ForeignKey("Account")]
        public int Id { get; set; }
        public string login { get; set; }
        public string email { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string city { get; set; }
        public int age { get; set; }
        public string photoName { get; set; }

        public virtual ICollection<Friend> MyFriends { get; set; }
        public virtual ICollection<Friend> IamFriends { get; set; }
        public virtual ICollection<Game> MyGamesMaster { get; set; }
        public virtual ICollection<GameToPerson> MyGames { get; set; }
        public Photo ProfilePhoto { get; set; }
        public virtual NotificationData NotificationData { get; set; }

        public PersonalData()
        {
            NotificationData = new NotificationData();
        }
    }
}
