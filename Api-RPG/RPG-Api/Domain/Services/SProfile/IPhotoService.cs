using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services.Profile
{
    public interface IPhotoService
    {
        Task<BaseResponse> UploadPhotoAsync(int pdataId, IFormFile file);
        Task<BaseResponse> DeletePhotoAsync(int userId, string fileName);
        string GetMimeType(string fileName);
    }
}
