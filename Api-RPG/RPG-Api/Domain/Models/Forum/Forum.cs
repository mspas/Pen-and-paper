using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Models
{
    public class Forum
    {
        public Forum(int id)
        {
            Id = id;
            isPublic = true;
            lastActivityDate = DateTime.Now;
        }

        [ForeignKey("Game")]
        public int Id { get; set; }
        public bool isPublic { get; set; }
        public DateTime? lastActivityDate { get; set; }
        public virtual ICollection<Topic> Topics { get; set; }
    }
}
