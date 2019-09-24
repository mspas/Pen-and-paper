using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.SGame
{
    public interface IGameToPersonService
    {
        Task<List<GameToPersonResource>> GetG2PListAsync(string login);
        Task<GameToPersonResource> GetG2PAsync(int g2pId);
        Task<GameToPersonResponse> AddG2PAsync(GameToPerson g2pId);
        Task<GameToPersonResponse> EditG2PAsync(GameToPerson g2pId);
        Task<BaseResponse> DeleteG2PAsync(int g2pId);
    }
}
