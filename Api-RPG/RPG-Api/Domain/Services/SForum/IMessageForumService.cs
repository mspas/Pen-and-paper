using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.SForum
{
    public interface IMessageForumService
    {
        Task<MessageForum> GetMessageAsync(int messageId);
        Task<List<MessageForum>> GetMessageListAsync(int topicId, int page);
        Task<MessageForumResponse> AddMessageAsync(MessageForum message);
        Task<MessageForumResponse> EditMessageAsync(MessageForum message);
        Task<BaseResponse> DeleteMessageAsync(int messageId);
    }
}
