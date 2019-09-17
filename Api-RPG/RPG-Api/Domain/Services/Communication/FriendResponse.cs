using RPG.Api.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Communication
{
    public class FriendResponse : BaseResponse
    {
        public Friend Friend { get; set; }

        public FriendResponse(bool success, string message, Friend friend) : base(success, message)
        {
            Friend = friend;
        }
    }
}
