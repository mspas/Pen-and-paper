using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RForum
{
    public interface IMessageForumRepository
    {
        Task<MessageForum> GetMessageAsync(int messageId);
        Task<List<MessageForum>> GetMessageListAsync(int topicId);
        Task<List<MessageForum>> GetMessageListWithPageAsync(int topicId, int page);
        Task<MessageForumResponse> AddMessageAsync(MessageForum message);
        MessageForumResponse EditMessage(MessageForum message);
        BaseResponse DeleteMessage(MessageForum message);
    }
}
