using Microsoft.EntityFrameworkCore;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Repositories;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Persistence.Repositories
{
    public class PhotoRepository : BaseRepository, IPhotoRepository
    {
        public PhotoRepository(RpgDbContext context) : base(context)
        {
        }

        public async Task<BaseResponse> AddPhotoAsync(Photo photo)
        {
            await _context.Photos.AddAsync(photo);
            return new BaseResponse(true, null);
        }

        public BaseResponse DeletePhoto(Photo photo)
        {
            _context.Photos.Remove(photo);
            return new BaseResponse(true, null);
        }

        public async Task<List<Photo>> GetPhotoListAsync(int sourceId)
        {
            return await _context.Photos.Where(mbox => mbox.sourceId == sourceId).ToListAsync();
        }
    }
}
