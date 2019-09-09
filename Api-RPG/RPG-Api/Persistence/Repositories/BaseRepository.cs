using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly RpgDbContext _context;

        protected BaseRepository(RpgDbContext context)
        {
            _context = context;
        }
    }
}
