using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.SForum
{
    public interface ITopicService
    {
        Task<Topic> GetTopicAsync(int userId, int topicId);
        Task<List<Topic>> GetTopicListAsync(int forumId);
        Task<TopicResponse> AddTopicAsync(Topic topic, string bodyMessage);
        Task<TopicResponse> EditTopicAsync(Topic topic);
        Task<BaseResponse> DeleteTopicAsync(int topicId);
    }
}
