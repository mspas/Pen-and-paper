using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class SkillResponse : BaseResponse
    {
        public SkillResponse(bool success, string message, Skill skill) : base(success, message)
        {
            Skill = skill;
        }

        public SkillResponse(bool success, string message, MySkill mySkill) : base(success, message)
        {
            MySkill = mySkill;
        }

        public Skill Skill { get; set; }
        public MySkill MySkill { get; set; }
    }
}
