using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Models.Enums;
using RPG.Api.Domain.Repositories.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories.Profile
{
    public class AccountRepository : IAccountRepository
    {
        private readonly RpgDbContext _context;

        public AccountRepository(RpgDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Account account, ERole[] userRoles)
        {
            var roles = await _context.Roles.Where(r => userRoles.Any(ur => ur.ToString() == r.Name)).ToListAsync();

            foreach (var role in roles)
            {
                account.UserRoles.Add(new UserRole { RoleId = role.Id });
            }

            _context.Accounts.Add(account);
        }

        public Account FindByLoginAsync(string login)
        {
            return _context.Accounts.Include(u => u.UserRoles)
                                       .ThenInclude(ur => ur.Role)
                                       .SingleOrDefault(u => u.login == login);
        }
    }
}
