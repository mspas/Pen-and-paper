using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class SkillResource
{
        public SkillResource(int id, string skillName, int gameId)
        {
            Id = id;
            this.skillName = skillName;
            this.gameId = gameId;
        }

        public int Id { get; set; }
        public string skillName { get; set; }
        public int gameId { get; set; }
    }
}
