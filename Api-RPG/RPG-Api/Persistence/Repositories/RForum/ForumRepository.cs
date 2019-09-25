using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories.RForum;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.RForum
{
    public class ForumRepository : BaseRepository, IForumRepository
    {
        public ForumRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<BaseResponse> AddForumAsync(Forum forum)
        {
            await _context.Forums.AddAsync(forum);
            return new BaseResponse(true, null);
        }

        public BaseResponse DeleteForum(Forum forum)
        {
            _context.Forums.Remove(forum);
            return new BaseResponse(true, null);
        }

        public BaseResponse EditForum(Forum forum)
        {
            _context.Forums.Update(forum);
            return new BaseResponse(true, null);
        }

        public async Task<Forum> GetForumAsync(int gameId)
        {
            return await  _context.Forums.Include(mbox => mbox.Topics).FirstAsync(mbox => mbox.Id == gameId);
        }

        public Task<List<Forum>> GetForumListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
