using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class MyItem
{
        public int Id { get; set; }
        public string itemName { get; set; }
        public int? itemValue { get; set; }
        public int cardId { get; set; }
        public virtual GameToPerson card { get; set; }
    }
}
