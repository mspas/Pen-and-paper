using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RGame
{
    public interface ISkillRepository
    {
        Task<Skill> GetSkillAsync(int skillId);
        Task<List<Skill>> GetSkillListAsync(int gameId);
        Task<SkillResponse> AddSkillAsync(Skill skill);
        BaseResponse DeleteSkill(Skill skill);
    }
}
