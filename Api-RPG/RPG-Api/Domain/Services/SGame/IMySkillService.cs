using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.SGame
{
    public interface IMySkillService
    {
        Task<List<MySkill>> GetMySkillListAsync(int g2pId);
        Task<SkillResponse> AddMySkillAsync(MySkill mySkill);
        Task<SkillResponse> EditMySkillAsync(MySkill mySkill);
        Task<BaseResponse> DeleteMySkillAsync(int mySkillId);
    }
}
