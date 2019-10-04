using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class Game
    {
        public int Id { get; set; }
        public int masterId { get; set; }
        public string title { get; set; }
        public string category { get; set; }
        public int nofparticipants { get; set; }
        public int maxplayers { get; set; }
        public string description { get; set; }
        public string book { get; set; }
        public string comment { get; set; }
        public DateTime date { get; set; }
        public bool needInvite { get; set; }
        public bool hotJoin { get; set; }
        public string status { get; set; }
        public string photoName { get; set; }
        public string bgPhotoName { get; set; }
        public DateTime? lastActivityDate { get; set; }
        public PersonalData gameMaster { get; set; }
        public virtual Forum forum { get; set; }
        public virtual ICollection<GameToPerson> participants { get; set; }
        public virtual ICollection<Skill> skillSetting { get; set; }
        public virtual ICollection<GameSession> sessions { get; set; }
        public Photo ProfilePhoto { get; set; }
        public Photo BackgroundPhoto { get; set; }


        public Game()
        {
        }
    }

}