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
    public class TopicToPersonService : ITopicToPersonService
    {
        private readonly ITopicToPersonRepository _topicToPersonRepository;
        private readonly IUnitOfWork _unitOfWork;

        public TopicToPersonService(ITopicToPersonRepository topicToPersonRepository, IUnitOfWork unitOfWork)
        {
            _topicToPersonRepository = topicToPersonRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<TopicToPersonResponse> AddT2PAsync(TopicToPerson t2p)
        {
            var response = await _topicToPersonRepository.AddT2PAsync(t2p);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<BaseResponse> DeleteT2PAsync(int t2pId)
        {
            var t2p = await _topicToPersonRepository.GetT2PAsync(t2pId);
            var response = _topicToPersonRepository.DeleteT2P(t2p);
            await _unitOfWork.CompleteAsync();
            return response;
        }

        public async Task<TopicToPersonResponse> EditT2PAsync(TopicToPerson t2p)
        {
            var toUpdate = await _topicToPersonRepository.GetT2PAsync(t2p.Id);
            if (toUpdate == null)
            {
                return new TopicToPersonResponse(false, "Access to topic not found", null);
            }

            toUpdate.lastActivitySeen = t2p.lastActivitySeen;
            await _unitOfWork.CompleteAsync();
            return new TopicToPersonResponse(true, null, toUpdate);
        }

        public async Task<TopicToPerson> GetT2PAsync(int t2pId)
        {
            return await _topicToPersonRepository.GetT2PAsync(t2pId);
        }

        public async Task<List<TopicToPerson>> GetT2PListAsync(int userId, int forumId)
        {
            if (forumId < 0)
            {
                return await _topicToPersonRepository.GetT2PListForNotificationAsync(userId);

            }
            return await _topicToPersonRepository.GetT2PListAsync(userId, forumId);
        }
    }
}
