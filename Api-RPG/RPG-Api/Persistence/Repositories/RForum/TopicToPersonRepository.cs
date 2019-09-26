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
    public class TopicToPersonRepository : BaseRepository, ITopicToPersonRepository
    {
        public TopicToPersonRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<TopicToPersonResponse> AddT2PAsync(TopicToPerson t2p)
        {
            await _context.TopicsToPersons.AddAsync(t2p);
            return new TopicToPersonResponse(true, null, t2p);
        }

        public BaseResponse DeleteT2P(TopicToPerson t2p)
        {
            _context.TopicsToPersons.Remove(t2p);
            return new BaseResponse(true, null);
        }

        public TopicToPersonResponse EditT2P(TopicToPerson t2p)
        {
            _context.TopicsToPersons.Update(t2p);
            return new TopicToPersonResponse(true, null, t2p);
        }

        public async Task<TopicToPerson> GetT2PAsync(int t2pId)
        {
            return await _context.TopicsToPersons.Include(p => p.UserNotificationData)
                                                    .Include(p => p.Topic)
                                                    .FirstAsync(mbox => mbox.Id == t2pId);
        }

        public async Task<List<TopicToPerson>> GetT2PListAsync(int userId, int forumId)
        {
            return await _context.TopicsToPersons.Include(p => p.UserNotificationData)
                                                    .Include(p => p.Topic)
                                                    .Where(mbox => mbox.userId == userId && mbox.forumId == forumId)
                                                    .ToListAsync();
        }

        public async Task<List<TopicToPerson>> GetT2PListForNotificationAsync(int userId)
        {
            return await _context.TopicsToPersons.Include(p => p.UserNotificationData)
                                                    .Include(p => p.Topic)
                                                    .Where(mbox => mbox.userId == userId)
                                                    .ToListAsync();
        }
    }
}
