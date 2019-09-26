using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.SForum
{
    public interface ITopicToPersonService
    {
        Task<TopicToPerson> GetT2PAsync(int t2pId);
        Task<List<TopicToPerson>> GetT2PListAsync(int userId, int forumId);
        Task<TopicToPersonResponse> AddT2PAsync(TopicToPerson t2p);
        Task<TopicToPersonResponse> EditT2PAsync(TopicToPerson t2p);
        Task<BaseResponse> DeleteT2PAsync(int t2pId);
    }
}