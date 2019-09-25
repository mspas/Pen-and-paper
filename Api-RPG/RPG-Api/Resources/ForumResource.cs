using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Resources
{
    public class ForumResource
    {
        public int Id { get; set; }
        public bool isPublic { get; set; }
        public DateTime? lastActivityDate { get; set; }
        public virtual List<Topic> Topics { get; set; }
    }
}
