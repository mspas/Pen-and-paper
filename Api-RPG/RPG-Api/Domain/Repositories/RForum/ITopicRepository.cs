using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RForum
{
    public interface ITopicRepository
    {
        Task<Topic> GetTopicAsync(int topicId);
        Task<List<Topic>> GetTopicListAsync(int forumId);
        Task<TopicResponse> AddTopicAsync(Topic topic);
        TopicResponse EditTopic(Topic topic);
        BaseResponse DeleteTopic(Topic topic);
    }
}
