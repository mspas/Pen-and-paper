using AutoMapper;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Repositories.RForum;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.SForum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.SForum
{
    public class ForumService : IForumService
    {
        private readonly IForumRepository _forumRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ForumService(IForumRepository forumRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _forumRepository = forumRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public Task<BaseResponse> AddForumAsync(Forum forum)
        {
            throw new NotImplementedException();
        }

        public async Task<BaseResponse> DeleteForumAsync(int forumId)
        {
            var forum = await _forumRepository.GetForumAsync(forumId);
            var response = _forumRepository.DeleteForum(forum);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<BaseResponse> EditForumAsync(Forum forum)
        {
            var toUpdate = await _forumRepository.GetForumAsync(forum.Id);
            toUpdate.lastActivityDate = forum.lastActivityDate;
            toUpdate.isPublic = forum.isPublic;

            var response = _forumRepository.EditForum(toUpdate);
            await _unitOfWork.CompleteAsync();

            return response;
        }

        public async Task<Forum> GetForumAsync(int forumId)
        {
            return await _forumRepository.GetForumAsync(forumId);
        }
    }
}
