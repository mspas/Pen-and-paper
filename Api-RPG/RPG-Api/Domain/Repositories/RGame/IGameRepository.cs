using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories.RGame
{
    public interface IGameRepository
    {
        Task<Game> GetGameAsync(int gameId);
        Task<List<Game>> GetGameListAsync();
        Task<GameResponse> AddGameAsync(Game game);
        GameResponse EditGame(Game game);
        BaseResponse DeleteGame(Game game);
    }
}
