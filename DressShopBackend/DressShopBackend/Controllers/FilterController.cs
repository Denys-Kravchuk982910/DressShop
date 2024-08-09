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
    public class FilterController : ControllerBase
    {
        private EFContext _context { get; set; }

        public FilterController(EFContext context)
        {
            this._context = context;
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("add")]
        public IActionResult CreateFilter([FromBody] CreateFilterModel filterModel)
        {
            AppFilter filter = new AppFilter();

            filter.Title = filterModel.Title;
            filter.Category = filterModel.Category.ToLower();

            _context.Filters.Add(filter);
            _context.SaveChanges();

            return Ok(filter);
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("remove")]
        public IActionResult RemoveFilter([FromQuery] int id)
        {
            var filter = _context.Filters.FirstOrDefault(filter => filter.Id == id);

            foreach (var filterProduct in _context.FilterProducts.Where(x => x.FilterId == id).ToList())
            {
                _context.FilterProducts.Remove(filterProduct);
                _context.SaveChanges();
            }

            if (filter != null) 
            {
                _context.Filters.Remove(filter);
                _context.SaveChanges();
            }

            return Ok(filter);
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("edit")]
        public IActionResult EditFilter([FromBody] EditFilterModel edit)
        {
            var filter = _context.Filters.FirstOrDefault(filter => filter.Id == edit.Id);

            if (filter != null)
            {
                filter.Title = edit.Title;
                filter.Category = edit.Category;

                _context.SaveChanges();
            }

            return Ok(filter);
        }

        [HttpGet("get")]
        public IActionResult Get()
        {
            return Ok(_context.Filters
                .GroupBy(x => x.Category).Select(x => new
                {
                    Category = x.Key,
                    Filters = x.ToList()
                }).ToList());
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("getsizes")]
        public IActionResult GetSizes()
        {
            return Ok(_context.Filters.Where(x => x.Category == "розмір").Select(x => new
                {
                    Id = x.Id,
                    Title = x.Title,
                    Category = x.Category,
                }).ToList());
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("getfilters")]
        public IActionResult GetFiltersWithoutSize()
        {
            return Ok(_context.Filters.Where(x => x.Category != "розмір")
                .GroupBy(x => x.Category).Select(x => new
                {
                    Category = x.Key,
                    Filters = x.ToList()
                }).ToList());
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("getfiltersbyproductid")]
        public IActionResult GetFiltersWithoutSizeById([FromQuery] int id)
        {
            var filters = _context.Filters.Include(x => x.FilterProducts)
                .Where(x => x.FilterProducts.Where(y => y.ProductId == id).Any())
                .Where(x => x.Category != "розмір")
                .GroupBy(x => x.Category).Select(x => new
                {
                    Category = x.Key,
                    Filters = x.ToList().Select(y => new
                    {
                        Id = y.Id,
                        Title = y.Title,
                        Category = y.Category,
                    }),
                }).ToList();

            return Ok(filters);
        }
    }
}
