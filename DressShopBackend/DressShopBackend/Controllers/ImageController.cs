using DressShopBackend.Models;
using DressShopBackend.Services;
using Microsoft.AspNetCore.Mvc;
using DressShopBackend.Data.Entities;
using DressShopBackend.Data;
using DressShopBackend.Constants;
using Microsoft.AspNetCore.Authorization;

namespace DressShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private EFContext _context;

        public ImageController(EFContext context)
        {
            _context = context;
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("add")]
        public IActionResult AddImage([FromBody] ImageModel imageModel)
        {
            try
            {
                string[] edited = imageModel.ImageBase64.Contains(",") ? imageModel.ImageBase64.Split(',')
                 : ("base64," + imageModel.ImageBase64).Split(',');

                string editedStr = "";

                for (int i = 1; i < edited.Length; i++)
                {
                    editedStr += edited[i];
                }


                string path = Path.Combine(Directory.GetCurrentDirectory(), "Images");
                string filename = $"{Guid.NewGuid()}.png";

                string imgPath = Path.Combine(path, filename);

                ImageHelper.SaveImageFromBase64(editedStr, imgPath);


                AppImage newImage = new AppImage() 
                {
                    Image = filename,
                    ProductId = imageModel.ProductId,
                };

                _context.Add(newImage);
                _context.SaveChanges();

                return Ok(new { FileName = filename });
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("remove")]
        public IActionResult RemoveImage([FromQuery] string image)
        {
            var img = _context.Images.FirstOrDefault(x => x.Image == image);

            string path = Path.Combine(Directory.GetCurrentDirectory(), "Images", image);

            if (System.IO.File.Exists(path)) 
            { 
                System.IO.File.Delete(path);
            }

            if (img != null)
            {
                _context.Images.Remove(img);
                _context.SaveChanges();

                return Ok(img);
            }

            return BadRequest();
        }
    }
}
