using mdRPG.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Controllers.Resources
{
    public class GameResource
{
        public GameResource(int id, int masterId, string title, string category, int nofparticipants, int nofplayers, string description, string location, string book, string comment, DateTime date, bool needInvite, bool isActive, PersonalDataResource gameMaster, List<PersonalDataResource> participants, List<SkillResource> skillSetting, List<GameSession> sessions, List<GameToPersonResource> cards)
        {
            Id = id;
            this.masterId = masterId;
            this.title = title;
            this.category = category;
            this.nofparticipants = nofparticipants;
            this.nofplayers = nofplayers;
            this.description = description;
            this.location = location;
            this.book = book;
            this.comment = comment;
            this.date = date;
            this.needInvite = needInvite;
            this.isActive = isActive;
            this.gameMaster = gameMaster;
            this.participants = participants;
            this.skillSetting = skillSetting;
            this.sessions = sessions;
            this.cards = cards;
        }

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
    public PersonalDataResource gameMaster { get; set; }
    public List<PersonalDataResource> participants { get; set; }
    public List<SkillResource> skillSetting { get; set; }
    public List<GameSession> sessions { get; set; }
    public List<GameToPersonResource> cards { get; set; }

      
    }
}
