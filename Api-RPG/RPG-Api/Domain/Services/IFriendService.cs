using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services
{
    public interface IFriendService
    {
        Task<List<FriendResource>> GetFriendsListAsync(int userId);
        Task<FriendResource> GetFriendAsync(int userId, int friendId);
        Task<FriendResource> GetFriendForTimestampAsync(int friendId);
        Task<FriendResponse> AddFriendAsync(Friend friend);
        Task<FriendResponse> EditFriendAsync(Friend friend);
        Task<BaseResponse> DeleteFriendAsync(int friendId);
    }
}
