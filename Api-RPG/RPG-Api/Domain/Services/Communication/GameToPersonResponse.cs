using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class GameToPersonResponse : BaseResponse
    {
        public GameToPersonResponse(bool success, string message, GameToPerson gameToPerson) : base(success, message)
        {
            GameToPerson = gameToPerson;
        }

        public GameToPerson GameToPerson { get; set; }
    }
}
