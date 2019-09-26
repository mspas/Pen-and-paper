using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RForum
{
    public interface ITopicToPersonRepository
    {
        Task<TopicToPerson> GetT2PAsync(int t2pId);
        Task<List<TopicToPerson>> GetT2PListAsync(int userId, int forumId);
        Task<List<TopicToPerson>> GetT2PListForNotificationAsync(int userId);
        Task<TopicToPersonResponse> AddT2PAsync(TopicToPerson t2p);
        TopicToPersonResponse EditT2P(TopicToPerson t2p);
        BaseResponse DeleteT2P(TopicToPerson t2p);
    }
}
