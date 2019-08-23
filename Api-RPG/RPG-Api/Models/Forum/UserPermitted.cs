using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class UserPermitted
    {
        public int Id { get; set; }
        public int topicId { get; set; }
        public int userId { get; set; }
        public virtual Topic Topic { get; set; }
        public virtual GameToPerson UserCard { get; set; }
    }
}
