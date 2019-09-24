using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RGame
{
    public interface IGameToPersonRepository
    {
        Task<List<GameToPerson>> GetG2PListAsync(int userId);
        Task<GameToPerson> GetG2PAsync(int g2pId);
        Task<GameToPersonResponse> AddG2PAsync(GameToPerson g2p);
        GameToPersonResponse EditG2P(GameToPerson g2p);
        BaseResponse DeleteG2P(GameToPerson g2p);
    }
}
