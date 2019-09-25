using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.RGame
{
    public class MySkillRepository : BaseRepository, IMySkillRepository
    {
        public MySkillRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<SkillResponse> AddMySkillAsync(MySkill mySkill)
        {
            await _context.MySkills.AddAsync(mySkill);
            return new SkillResponse(true, null, mySkill);
        }

        public BaseResponse DeleteMySkill(MySkill mySkill)
        {
            _context.MySkills.Remove(mySkill);
            return new BaseResponse(true, null);
        }

        public SkillResponse EditMySkill(MySkill mySkill)
        {
            _context.MySkills.Update(mySkill);
            return new SkillResponse(true, null, mySkill);
        }

        public async Task<MySkill> GetMySkillAsync(int skillId)
        {
            return await _context.MySkills.FindAsync(skillId);
        }

        public async Task<List<MySkill>> GetMySkillListAsync(int g2pId)
        {
            return await _context.MySkills.Where(mbox => mbox.cardId == g2pId).ToListAsync();
        }
    }
}
