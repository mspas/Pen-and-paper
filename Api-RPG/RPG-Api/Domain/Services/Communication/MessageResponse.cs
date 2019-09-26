using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class MessageResponse : BaseResponse
    {
        public Message MessageBody { get; set; }

        public MessageResponse(bool success, string message, Message messagePost) : base(success, message)
        {
            MessageBody = messagePost;
        }
    }
}
