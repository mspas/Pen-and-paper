using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class TopicResponse : BaseResponse
    {
        public TopicResponse(bool success, string message, Topic topic) : base(success, message)
        {
            Topic = topic;
        }

        public Topic Topic { get; set; }
    }
}
