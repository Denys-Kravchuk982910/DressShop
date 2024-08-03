using DressShopBackend.Constants;
using DressShopBackend.Data;
using DressShopBackend.Data.Entities;
using DressShopBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DressShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private EFContext _context { get; set; }

        public SizeController(EFContext context)
        {
            this._context = context;
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("add")]
        public IActionResult AddSize([FromBody] AddSizeModel addSize)
        {
            var newSize = new AppSize { Size = addSize.SizeName };

            try
            {

                _context.Sizes.Add(new AppSize { Size = addSize.SizeName });
                _context.SaveChanges();
            }
            catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }

            return Ok(newSize);
        }

        [HttpGet("get")]
        public IActionResult Get() 
        {
            return Ok(_context.Filters.Where(x => x.Title == "розмір").ToList());
        }

        [HttpGet("getbyproductid")]
        public IActionResult GetByProductId([FromRoute] int productId)
        {
            var product = _context.Products
                .Include(x => x.SizeProducts).FirstOrDefault(x => x.Id == productId);

            List<AppSize> returnSizes = new List<AppSize>();

            if (product != null) 
            {
                IQueryable<AppSize> sizes = _context.Sizes;

                foreach (var sizeProduct in product.SizeProducts)
                {
                    var size = sizes.FirstOrDefault(x => x.Id == sizeProduct.SizeId);

                    if (size != null)
                    {
                        returnSizes.Add(size);
                    }
                }
            }

            return Ok(returnSizes);
        }
    }
}
