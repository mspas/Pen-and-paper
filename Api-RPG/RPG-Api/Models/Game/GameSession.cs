using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mdRPG.Models
{
    public class GameSession
{
        public int Id { get; set; }
        public string sessionName { get; set; }
        public DateTime date { get; set; }
        public int gameId { get; set; }
        public virtual Game game { get; set; }
    }
}
