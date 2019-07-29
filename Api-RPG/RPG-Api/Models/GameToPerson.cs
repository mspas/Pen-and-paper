using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class GameToPerson
{
        public int Id { get; set; }
        public int gameId { get; set; }
        public int playerId { get; set; }
        public bool isGameMaster { get; set; }
        public bool isAccepted { get; set; }
        public bool isMadeByPlayer { get; set; }
        public int characterHealth { get; set; }

        public virtual Game game { get; set; }
        public virtual PersonalData player { get; set; }
        public virtual ICollection<MySkill> characterSkills { get; set; }
        public virtual ICollection<MyItem> characterItems { get; set; }

        /*public GameToPerson(int gameID, int playerID, bool master, bool accept, bool made)
        {
            gameId = gameID;
            playerId = playerID;
            isGameMaster = master;
            isAccepted = accept;
            isMadeByPlayer = made;
        }*/
    }
}
