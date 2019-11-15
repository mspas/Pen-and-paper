using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RPG.Api.Domain.Models;
using RPG.Api.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RPG.Api.Domain.Services
{
    public interface IPhotoService
    {
        Task<List<Photo>> GetPhotoListAsync(int sourceId);
        Task<BaseResponse> UploadProfilePhotoAsync(int id, bool isBgPhoto, IFormFile file);
        Task<BaseResponse> UploadGamePhotoAsync(int id, bool isBgPhoto, IFormFile file);
        Task<BaseResponse> UploadPostPhotoAsync(int id, IFormFile file);
        Task<BaseResponse> UploadMessagePhotoAsync(int id, IFormFile file);
        Task<BaseResponse> DeletePhotoAsync(int userId, string fileName);
        string GetMimeType(string fileName);
    }
}
