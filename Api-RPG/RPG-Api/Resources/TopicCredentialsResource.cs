using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class TopicCredentialsResource
    {
        public TopicCredentialsResource(TopicCredentials topic, string bodyMessage)
        {
            this.topic = topic;
            this.bodyMessage = bodyMessage;
        }

        public TopicCredentials topic { get; set; }
        public string bodyMessage { get; set; }
    }
}
