using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.Profile
{
    public interface IMessageRepository
    {
        Task<Message> GetMessageAsync(int messageId);
        Task<List<Message>> GetMessageListAsync(int relationId);
        Task<MessageResponse> AddMessageAsync(Message message);
        MessageResponse EditMessageAsync(Message message);
        BaseResponse DeleteMessageAsync(Message message);
    }
}
