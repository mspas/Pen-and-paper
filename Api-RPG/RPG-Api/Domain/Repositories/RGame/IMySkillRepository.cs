using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RGame
{
    public interface IMySkillRepository
    {
        Task<MySkill> GetMySkillAsync(int skillId);
        Task<List<MySkill>> GetMySkillListAsync(int g2pId);
        Task<SkillResponse> AddMySkillAsync(MySkill mySkill);
        SkillResponse EditMySkill(MySkill mySkill);
        BaseResponse DeleteMySkill(MySkill mySkill);
    }
}
