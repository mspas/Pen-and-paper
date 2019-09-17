using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Services.Communication;
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

        public FriendResponse EditFriend(Friend friend)
        {
            if (friend == null)
            {
                return new FriendResponse(false, null, null);
            }

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
