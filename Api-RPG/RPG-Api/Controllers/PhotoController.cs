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
    [Route("/api/[controller]")]
    public class PhotoController : Controller
    {
        private readonly IHostingEnvironment _host;
        private readonly IPhotoService _photoService;

        public PhotoController(IHostingEnvironment host, IPhotoService photoService)
        {
            _host = host;
            _photoService = photoService;
        }

        [HttpPost("/api/Photo/{profileOrGame}/{isBgPhoto}/{id}")]
        public async Task<BaseResponse> Upload(bool profileOrGame, int id, bool isBgPhoto, IFormFile file)
        {
            Console.WriteLine("helo " + id);
            return await _photoService.UploadPhotoAsync(profileOrGame, id, isBgPhoto, file);
        }

        [HttpGet("{filename}")]
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

        [HttpDelete("{profileOrGame}/{userId}/{fileName}")]
        public async Task<BaseResponse> DeleteFile(bool profileOrGame, int userId, string fileName)
        {
            return await _photoService.DeletePhotoAsync(userId, fileName);
        }
    }
}
