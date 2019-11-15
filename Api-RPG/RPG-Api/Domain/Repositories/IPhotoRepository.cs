using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Repositories
{
    public interface IPhotoRepository
    {
        Task<List<Photo>> GetPhotoListAsync(int sourceId);
        Task<BaseResponse> AddPhotoAsync(Photo photo);
        BaseResponse DeletePhoto(Photo photo);
    }
}
