using AutoMapper;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.SGame;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.SGame
{
    public class SkillService : ISkillService
    {
        private readonly ISkillRepository _skillRepository;
        private readonly IUnitOfWork _unitOfWork;

        public SkillService(ISkillRepository skillRepository, IUnitOfWork unitOfWork)
        {
            _skillRepository = skillRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<SkillResponse> AddSkillAsync(Skill skill)
        {
            var response = await _skillRepository.AddSkillAsync(skill);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<BaseResponse> DeleteSkillAsync(int skillId)
        {
            var skill = await _skillRepository.GetSkillAsync(skillId);
            var response = _skillRepository.DeleteSkill(skill);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<List<Skill>> GetSkillListAsync(int gameId)
        {
            var response = await _skillRepository.GetSkillListAsync(gameId);
            await _unitOfWork.CompleteAsync();
            return response;
        }
    }
}
