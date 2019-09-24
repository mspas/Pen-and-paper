using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Domain.Services.SGame;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Services.SGame
{
    public class GameToPersonService : IGameToPersonService
    {
        public Task<GameToPersonResponse> AddG2PAsync(GameToPerson g2pId)
        {
            throw new NotImplementedException();
        }

        public Task<BaseResponse> DeleteG2PAsync(int g2pId)
        {
            throw new NotImplementedException();
        }

        public Task<GameToPersonResponse> EditG2PAsync(GameToPerson g2pId)
        {
            throw new NotImplementedException();
        }

        public Task<GameToPersonResource> GetG2PAsync(int g2pId)
        {
            throw new NotImplementedException();
        }

        public Task<List<GameToPersonResource>> GetG2PListAsync(string login)
        {
            throw new NotImplementedException();
        }
    }
}
