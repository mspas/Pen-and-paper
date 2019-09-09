using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class Skill
{
        public int Id { get; set; }
        public string skillName { get; set; }
        public int gameId { get; set; }
        public virtual Game game { get; set; }
    }
}
