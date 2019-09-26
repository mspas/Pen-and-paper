using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories.RGame;
using RPG.Api.Domain.Services.Communication;
using RPG.Api.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.RGame
{
    public class GameToPersonRepository : BaseRepository, IGameToPersonRepository
    {
        public GameToPersonRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<GameToPersonResponse> AddG2PAsync(GameToPerson g2p)
        {
            await _context.GamesToPerson.AddAsync(g2p);
            return new GameToPersonResponse(true, null, g2p);
        }

        public BaseResponse DeleteG2P(GameToPerson g2p)
        {
            _context.GamesToPerson.Remove(g2p);
            return new BaseResponse(true, null);
        }

        public GameToPersonResponse EditG2P(GameToPerson g2p)
        {
            _context.GamesToPerson.Update(g2p);
            return new GameToPersonResponse(true, null, g2p);
        }

        public async Task<GameToPerson> GetG2PAsync(int g2pId)
        {
            return await _context.GamesToPerson.Include(p => p.game)
                                    .Include(p => p.player)
                                    .Include(p => p.characterSkills)
                                    .FirstAsync(mbox => mbox.Id == g2pId);
        }

        public async Task<List<GameToPerson>> GetG2PListAsync(int userId)
        {
            return await _context.GamesToPerson.Include(p => p.game)
                                    .Include(p => p.player)
                                    .Include(p => p.characterSkills)
                                    .Where(mbox => mbox.playerId == userId)
                                    .ToListAsync();
        }
    }
}
