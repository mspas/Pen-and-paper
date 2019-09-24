using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class GameResponse : BaseResponse
    {
        public Game Game { get; set; }

        public GameResponse(bool success, string message, Game game) : base(success, message)
        {
            Game = game;
        }
    }
}
