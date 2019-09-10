using RPG.Api.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly RpgDbContext _context;

        public UnitOfWork(RpgDbContext context)
        {
            _context = context;
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
