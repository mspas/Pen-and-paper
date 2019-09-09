using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class MySkill
{
        public int Id { get; set; }
        public string skillName { get; set; }
        public int skillValue { get; set; }
        public int cardId { get; set; }
        public virtual GameToPerson card { get; set; }
    }
}
