using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories
{
    public interface IFriendRepository
    {
        Task<Friend> GetFriendAsync(int id);
        Task<List<Friend>> GetFriendListAsync(int id);
        Task<FriendResponse> AddFriendAsync(Friend friend);
        BaseResponse DeleteFriend(Friend friend);
        FriendResponse EditFriend(FriendResource newFriendData, Friend friend);
    }
}
