using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.SGame
{
    public interface ISkillService
    {
        Task<List<Skill>> GetSkillListAsync(int gameId);
        Task<SkillResponse> AddSkillAsync(Skill skill);
        Task<BaseResponse> DeleteSkillAsync(int skillId);
    }
}
