using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Profile
{
    public interface IMessageService
    {
        Task<Message> GetMessageAsync(int messageId);
        Task<List<Message>> GetMessageListAsync(int relationId);
        Task<BaseResponse> AddMessageAsync(Message message);
        Task<MessageResponse> EditMessageAsync(int messageId);
        Task<BaseResponse> DeleteMessageAsync(int messageId);
    }
}
