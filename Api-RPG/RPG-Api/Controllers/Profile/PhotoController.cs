using AutoMapper;
using RPG.Api.Resources;
using RPG.Api.Domain.Models;
using RPG.Api.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using RPG.Api.Domain.Services;
using RPG.Api.Domain.Services.Communication;

namespace mdRPG.Controllers
{
    [Route("/api/pdata/{pdataId}/photos")]
    public class PhotoController : Controller
    {
        private readonly IHostingEnvironment _host;
        private readonly IPhotoService _photoService;

        public PhotoController(IHostingEnvironment host, IPhotoService photoService)
        {
            _host = host;
            _photoService = photoService;
        }

        [HttpPost]
        public async Task<BaseResponse> Upload(int pdataId, IFormFile file)
        {
            return await _photoService.UploadPhoto(pdataId, file);
        }

        [HttpGet("/api/photos/{filename}")]
        public async Task<IActionResult> DownloadFile(string filename)
        {
            try
            {
                string filePath = Path.Combine(Path.Combine(_host.WebRootPath, "uploads"), filename);

                var memory = new MemoryStream();
                using (var stream = new FileStream(filePath, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }

                memory.Position = 0;
                return File(memory, _photoService.GetMimeType(filePath), filename);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete("/api/photos/{userId}/{fileName}")]
        public async Task<BaseResponse> DeleteFile(int userId, string fileName)
        {
            return await _photoService.DeletePhoto(userId, fileName);
        }
    }
}
