using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories
{
    public class FriendRepository : BaseRepository, IFriendRepository
    {
        public FriendRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<FriendResponse> AddFriendAsync(Friend friend)
        {
            await _context.Friends.AddAsync(friend);
            return new FriendResponse(true, null, friend);
        }

        public BaseResponse DeleteFriend(Friend friend)
        {
            if (friend == null)
            {
                return new BaseResponse(false, null);
            }

            _context.Friends.Remove(friend);
            return new BaseResponse(true, null);
        }

        public FriendResponse EditFriend(FriendResource newFriendData, Friend friend)
        {
            if (friend == null || newFriendData == null)
            {
                return new FriendResponse(false, "Friend not found", null);
            }

            friend.isAccepted = newFriendData.isAccepted;
            friend.isFriendRequest = newFriendData.isFriendRequest;
            friend.lastMessageDate = friend.lastMessageDate;

            _context.Friends.Update(friend);
            return new FriendResponse(true, null, friend);
        }

        public async Task<Friend> GetFriendAsync(int id)
        {
            return await _context.Friends.FindAsync(id);
        }

        public async Task<List<Friend>> GetFriendListAsync(int id)
        {
            var list1 = await _context.Friends.Where(mbox => mbox.player1Id == id).ToListAsync();
            var list2 = await _context.Friends.Where(mbox => mbox.player2Id == id).ToListAsync();
            list2.ForEach(p => list1.Add(p));
            return list2;
        }
    }
}
