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
    public class MySkillService : IMySkillService
    {
        private readonly IMySkillRepository _mySkillRepository;
        private readonly IUnitOfWork _unitOfWork;

        public MySkillService(IMySkillRepository mySkillRepository, IUnitOfWork unitOfWork)
        {
            _mySkillRepository = mySkillRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<SkillResponse> AddMySkillAsync(MySkill mySkill)
        {
            var response = await _mySkillRepository.AddMySkillAsync(mySkill);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<BaseResponse> DeleteMySkillAsync(int mySkillId)
        {
            var mySkill = await _mySkillRepository.GetMySkillAsync(mySkillId);
            var response = _mySkillRepository.DeleteMySkill(mySkill);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<SkillResponse> EditMySkillAsync(MySkill mySkill)
        {
            var response = _mySkillRepository.EditMySkill(mySkill);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<List<MySkill>> GetMySkillListAsync(int g2pId)
        {
            var response = await _mySkillRepository.GetMySkillListAsync(g2pId);
            await _unitOfWork.CompleteAsync();
            return response;
        }
    }
}
