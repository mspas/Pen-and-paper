using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;

namespace RPG.Api.Domain.Services.SGame
{
    public interface IGameService
    {
        Task<Game> GetGameAsync(int gameId);
        Task<List<Game>> FindGamesAsync(string data);
        Task<GameResponse> AddGameAsync(Game game);
        Task<GameResponse> EditGameAsync(Game game);
        Task<BaseResponse> DeleteGameAsync(int gameId);
    }
}