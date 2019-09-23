using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories.Profile;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.Profile
{
    public class MessageRepository : BaseRepository, IMessageRepository
    {
        public MessageRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<MessageResponse> AddMessageAsync(Message message)
        {
            await _context.Messages.AddAsync(message);
            return new MessageResponse(true, null, message);
        }

        public BaseResponse DeleteMessageAsync(Message message)
        {
            if (message == null)
            {
                return new BaseResponse(false, "Friend not found");
            }

            _context.Messages.Remove(message);
            return new BaseResponse(true, null);
        }

        public MessageResponse EditMessageAsync(Message message)
        {
            if (message == null)
            {
                return new MessageResponse(false, "Friend not found", null);
            }

            _context.Messages.Update(message);
            return new MessageResponse(true, null, message);
        }

        public async Task<Message> GetMessageAsync(int messageId)
        {
            return await _context.Messages.FirstAsync(mbox => mbox.Id == messageId);
        }

        public async Task<List<Message>> GetMessageListAsync(int relationId)
        {
            return await _context.Messages.Where(mbox => mbox.relationId == relationId).ToListAsync();
        }
    }
}
