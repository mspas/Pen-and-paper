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
    public class MessageForumRepository : BaseRepository, IMessageForumRepository
    {
        public MessageForumRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<MessageForumResponse> AddMessageAsync(MessageForum message)
        {
            await _context.MessagesForum.AddAsync(message);
            return new MessageForumResponse(true, null, message);
        }

        public BaseResponse DeleteMessage(MessageForum message)
        {
            _context.MessagesForum.Remove(message);
            return new BaseResponse(true, null);
        }

        public MessageForumResponse EditMessage(MessageForum message)
        {
            _context.MessagesForum.Update(message);
            return new MessageForumResponse(true, null, message);
        }

        public async Task<MessageForum> GetMessageAsync(int messageId)
        {
            return await _context.MessagesForum.FirstAsync(mbox => mbox.Id == messageId);
        }

        public async Task<List<MessageForum>> GetMessageListAsync(int topicId)
        {
            return await _context.MessagesForum.Where(mbox => mbox.topicId == topicId).ToListAsync();
        }

        public async Task<List<MessageForum>> GetMessageListWithPageAsync(int topicId, int page)
        {
            return await _context.MessagesForum.Where(mbox => mbox.topicId == topicId && mbox.pageNumber == page).ToListAsync();
        }
    }
}
