using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RForum
{
    public interface IForumRepository
    {
        Task<Forum> GetForumAsync(int gameId);
        Task<List<Forum>> GetForumListAsync();
        Task<BaseResponse> AddForumAsync(Forum forum);
        BaseResponse EditForum(Forum forum);
        BaseResponse DeleteForum(Forum forum);
    }
}
