using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.RGame
{
    public class GameRepository : BaseRepository, IGameRepository
    {
        public GameRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<GameResponse> AddGameAsync(Game game)
        {
            await _context.Games.AddAsync(game);
            return new GameResponse(true, null, game);
        }

        public BaseResponse DeleteGame(Game game)
        {
            _context.Games.Remove(game);
            return new BaseResponse(true, null);
        }

        public GameResponse EditGame(Game game)
        {
            _context.Games.Update(game);
            return new GameResponse(true, null, game);
        }

        public async Task<Game> GetGameAsync(int gameId)
        {
            return await _context.Games.Include(p => p.gameMaster)
                                    .Include(p => p.participants)
                                    .Include(p => p.skillSetting)
                                    .Include(p => p.sessions)
                                    .FirstAsync(mbox => mbox.Id == gameId);
        }

        public async Task<Game> GetGameSnapAsync(int gameId)
        {
            return await _context.Games.Include(p => p.gameMaster).FirstAsync(mbox => mbox.Id == gameId);
        }

        public async Task<List<Game>> GetGameListAsync()
        {
            return await _context.Games.Include(p => p.gameMaster)
                                    .Include(p => p.participants)
                                    .Include(p => p.skillSetting)
                                    .Include(p => p.sessions)
                                    .ToListAsync();
        }
    }
}
