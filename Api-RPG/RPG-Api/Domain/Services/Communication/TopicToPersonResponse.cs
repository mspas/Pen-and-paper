using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class TopicToPersonResponse : BaseResponse
    {
        public TopicToPersonResponse(bool success, string message, TopicToPerson topicToPerson) : base(success, message)
        {
            TopicToPerson = topicToPerson;
        }

        public TopicToPerson TopicToPerson { get; set; }

    }
}
