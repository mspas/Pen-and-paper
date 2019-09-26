using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories.RForum;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.RForum
{
    public class TopicRepository : BaseRepository, ITopicRepository
    {
        public TopicRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<TopicResponse> AddTopicAsync(Topic topic)
        {
            await _context.Topics.AddAsync(topic);
            return new TopicResponse(true, null, topic);
        }

        public BaseResponse DeleteTopic(Topic topic)
        {
            _context.Topics.Remove(topic);
            return new BaseResponse(true, null);
        }

        public TopicResponse EditTopic(Topic topic)
        {
            _context.Topics.Update(topic);
            return new TopicResponse(true, null, topic);
        }

        public async Task<Topic> GetTopicAsync(int topicId)
        {
            return await _context.Topics.Include(mbox => mbox.Messages)
                                        .Include(mbox => mbox.UsersConnected)
                                        .FirstAsync(mbox => mbox.Id == topicId);
        }

        public async Task<List<Topic>> GetTopicListAsync(int forumId)
        {
            return await _context.Topics.Include(mbox => mbox.Messages)
                                        .Include(mbox => mbox.UsersConnected)
                                        .Where(mbox => mbox.forumId == forumId)
                                        .ToListAsync();
        }
    }
}
