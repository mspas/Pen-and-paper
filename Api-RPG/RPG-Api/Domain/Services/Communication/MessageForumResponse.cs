using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class MessageForumResponse : BaseResponse
    {
        public MessageForum MessageForum { get; set; }

        public MessageForumResponse(bool success, string message, MessageForum messageForum) : base(success, message)
        {
            MessageForum = messageForum;
        }
    }
}
