using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int masterId { get; set; }
        public string title { get; set; }
        public string category { get; set; }
        public int nofparticipants { get; set; }
        public int nofplayers { get; set; }
        public string description { get; set; }
        public string location { get; set; }
        public string book { get; set; }
        public string comment { get; set; }
        public DateTime date { get; set; }
        public bool needInvite { get; set; }
        public bool isActive { get; set; }
        public PersonalData gameMaster { get; set; }
        public virtual ICollection<GameToPerson> participants { get; set; }
        public virtual ICollection<Skill> skillSetting { get; set; }
        public virtual ICollection<GameSession> sessions { get; set; }
    }

}