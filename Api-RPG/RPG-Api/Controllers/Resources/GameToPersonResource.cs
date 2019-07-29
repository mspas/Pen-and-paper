using mdRPG.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Controllers.Resources
{
    public class GameToPersonResource
    {

        public int Id { get; set; }
        public int gameId { get; set; }
        public int playerId { get; set; }
        public bool isGameMaster { get; set; }
        public bool isAccepted { get; set; }
        public bool isMadeByPlayer { get; set; }
        public int characterHealth { get; set; }
        public Game game { get; set; }
        public virtual PersonalData player { get; set; }
        public List<MySkill> characterSkills { get; set; }
        public List<MyItem> characterItems { get; set; }

        public GameToPersonResource(int id, int gameId, int playerId, bool isGameMaster, bool isAccepted, bool isMadeByPlayer, int characterHealth, Game game, List<MySkill> characterSkills, List<MyItem> characterItems)
        {
            Id = id;
            this.gameId = gameId;
            this.playerId = playerId;
            this.isGameMaster = isGameMaster;
            this.isAccepted = isAccepted;
            this.isMadeByPlayer = isMadeByPlayer;
            this.characterHealth = characterHealth;
            this.game = game;
            this.characterSkills = characterSkills;
            this.characterItems = characterItems;
        }


    }
}
