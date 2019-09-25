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
    public class SkillRepository : BaseRepository, ISkillRepository
    {
        public SkillRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<SkillResponse> AddSkillAsync(Skill skill)
        {
            await _context.Skills.AddAsync(skill);
            return new SkillResponse(true, null, skill);
        }

        public BaseResponse DeleteSkill(Skill skill)
        {
            _context.Skills.Remove(skill);
            return new BaseResponse(true, null);
        }

        public async Task<Skill> GetSkillAsync(int skillId)
        {
            return await _context.Skills.FindAsync(skillId);
        }

        public async Task<List<Skill>> GetSkillListAsync(int gameId)
        {
            return await _context.Skills.Where(mbox => mbox.gameId == gameId).ToListAsync();
        }
    }
}
