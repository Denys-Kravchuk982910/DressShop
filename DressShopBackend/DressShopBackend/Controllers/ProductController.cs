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
    public class ProductController : ControllerBase
    {
        private EFContext _context;
        public ProductController(EFContext context)
        {
            _context = context;
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("create")]
        public IActionResult CreateProduct([FromBody] AddProductModel addProduct)
        {
            try
            {
                AppProduct product = new AppProduct();

                product.Title = addProduct.Title;
                product.Price = addProduct.Price;
                product.Description = addProduct.Description;
                product.Tag = addProduct.Tag;
                product.Rate = 0;

                _context.Products.Add(product);
                _context.SaveChanges();

                return Ok(product);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("edit")]
        public IActionResult EditProduct([FromBody] EditProductModel editProduct)
        {
            try
            {
                AppProduct? product = _context.Products.FirstOrDefault(x => x.Id == editProduct.Id);

                if (product == null) 
                {
                    return NotFound();
                }

                product.Title = editProduct.Title;
                product.Price = editProduct.Price;
                product.Description = editProduct.Description;
                product.Tag = editProduct.Tag;

                _context.SaveChanges();

                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("delete")]
        public IActionResult RemoveProduct([FromQuery] int id)
        {
            try
            {
                AppProduct? product = _context.Products
                    .Include(x => x.Images)
                    .Include(x => x.SizeProducts)
                    .Include(x => x.OrderProducts)
                    .Include(x => x.Feedbacks)
                    .Include(x => x.FilterProducts)
                    .FirstOrDefault(x => x.Id == id);

                if (product != null)
                {
                    foreach (var item in _context.SizeProducts.Where(x => x.ProductId == id).ToList())
                    {
                        _context.SizeProducts.Remove(item);
                        _context.SaveChanges();
                    }

                    foreach (var item in _context.OrderProducts.Where(x => x.ProductId == id).ToList())
                    {
                        _context.OrderProducts.Remove(item);
                        _context.SaveChanges();
                    }

                    foreach (var item in _context.Feedbacks.Where(x => x.ProductId == id).ToList())
                    {
                        _context.Feedbacks.Remove(item);
                        _context.SaveChanges();
                    }

                    foreach (var item in _context.FilterProducts.Where(x => x.ProductId == id).ToList())
                    {
                        _context.FilterProducts.Remove(item);
                        _context.SaveChanges();
                    }

                    foreach (var item in _context.Images.Where(x => x.ProductId == id).ToList())
                    {
                        string path = Path.Combine(Directory.GetCurrentDirectory(), "Images", item.Image);

                        if (System.IO.File.Exists(path))
                        {
                            System.IO.File.Delete(path);
                        }

                        _context.Images.Remove(item);
                        _context.SaveChanges();
                    }

                    _context.Products.Remove(product);
                    _context.SaveChanges();
                }


                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        public IActionResult GetProducts([FromQuery] int page,
            [FromQuery] string? order, [FromQuery] string[] category,
            [FromQuery] string[] sizes)
        {
            const int ProductsPerPage = 12;

            IQueryable<ProductFiltered> products = _context.Products.Include(x => x.FilterProducts)
                .ThenInclude(x => x.Filter).Include(x => x.Images).Include(x => x.SizeProducts)
                    .ThenInclude(x => x.Size).Include(x => x.Feedbacks)
                .Select(x => new ProductFiltered
                {
                    ShortDesc = x.Tag,
                    Title = x.Title,
                    Description = x.Description,
                    Price = x.Price,
                    Id = x.Id,
                    Rating = x.Rate,
                    Fiters = x.FilterProducts
                        .Where(y => y.ProductId == x.Id)
                        .Select(y => new FilterModel
                        {
                            Title = y.Filter.Title,
                            Category = y.Filter.Category,
                        }).ToList(),
                    Images = x.Images.Select(x => x.Image).ToList(),
                    Sizes = x.FilterProducts.Where(k => k.Filter.Category == "розмір")
                        .Select(k => k.Filter.Title).ToList(),
                    Feedbacks = x.Feedbacks.Select(k => new FeedbackModel
                    {
                        Author = k.AuthorName,
                        Comment = k.Text,
                        Image = k.AuthorImage,
                    }).ToList(),
                });

            var categories = category.SelectMany(x => _context.Filters
                .Where(y => y.Title.ToLower() == x.ToLower()))
                .GroupBy(x => x.Category).Select(x => new { 
                    x.Key,
                    Values = x.Select(y => y.Title),
                });

            if (category.Length > 0)
            {
                foreach (var categoryGroup in categories)
                {
                    List<IQueryable<ProductFiltered>> finalProducts = new List<IQueryable<ProductFiltered>>();

                    foreach (var categoryItem in categoryGroup.Values)
                    {
                        if (categoryItem != null)
                        {
                            var result = products.Where(x => x.Fiters
                            .Where(y => y.Title.ToLower() == categoryItem.ToLower()).Any()).AsQueryable();

                            finalProducts.Add(result);
                        }
                    }

                    products = finalProducts
                        .SelectMany(x => x).Select(x => x).AsQueryable();
                }
            }

            if (sizes.Length > 0)
            {
                List<IQueryable<ProductFiltered>> finalProducts = new List<IQueryable<ProductFiltered>>();

                foreach (var sizeItem in sizes)
                {
                    if (sizeItem != null)
                    {
                        var result = products.Where(x => x.Sizes
                        .Where(y => y.ToLower() == sizeItem.ToLower()).Any()).AsQueryable();

                        finalProducts.Add(result);
                    }
                }

                products = finalProducts
                    .SelectMany(x => x).Select(x => x).AsQueryable();
            }

            IQueryable<ProductFiltered> appProducts = products.AsQueryable();

            switch (order)
            {
                case "priceTop":
                    {
                        appProducts = appProducts.OrderByDescending(x => x.Price);

                        break;
                    }

                case "priceDown":
                    {
                        appProducts = appProducts.OrderBy(x => x.Price);

                        break;
                    }

                case "rate":
                    {
                        appProducts = appProducts.OrderByDescending(x => x.Rating);

                        break;
                    }

                default:
                    {
                        appProducts = appProducts.OrderByDescending(x => x.Id);

                        break;
                    }
            }

            return Ok(appProducts.Skip((page - 1) * ProductsPerPage)
                .Take(ProductsPerPage).ToList());
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("getall")]
        public IActionResult GetAppProducts()
        {
            IQueryable<ProductFiltered> products = _context.Products.Include(x => x.FilterProducts)
                .ThenInclude(x => x.Filter).Include(x => x.Images).Include(x => x.SizeProducts)
                    .ThenInclude(x => x.Size).Include(x => x.Feedbacks)
                .Select(x => new ProductFiltered
                {
                    ShortDesc = x.Tag,
                    Title = x.Title,
                    Description = x.Description,
                    Price = x.Price,
                    Id = x.Id,
                    Rating = x.Rate,
                    Fiters = x.FilterProducts
                        .Where(y => y.ProductId == x.Id)
                        .Select(y => new FilterModel
                        {
                            Title = y.Filter.Title,
                            Category = y.Filter.Category,
                        }).ToList(),
                    Images = x.Images.Select(x => x.Image).ToList(),
                    Sizes = x.FilterProducts.Where(k => k.Filter.Category == "розмір")
                        .Select(k => k.Filter.Title).ToList(),
                    Feedbacks = x.Feedbacks.Select(k => new FeedbackModel
                    {
                        Author = k.AuthorName,
                        Comment = k.Text,
                        Image = k.AuthorImage,
                    }).ToList(),
                });

            return Ok(products.ToList());
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("getbyid")]
        public IActionResult GetProductById([FromQuery] int id)
        {
            ProductFiltered product = _context.Products.Include(x => x.FilterProducts)
                .ThenInclude(x => x.Filter).Include(x => x.Images).Include(x => x.SizeProducts)
                    .ThenInclude(x => x.Size).Include(x => x.Feedbacks)
                .Select(x => new ProductFiltered
                {
                    ShortDesc = x.Tag,
                    Title = x.Title,
                    Description = x.Description,
                    Price = x.Price,
                    Id = x.Id,
                    Rating = x.Rate,
                    Fiters = x.FilterProducts
                        .Where(y => y.ProductId == x.Id)
                        .Select(y => new FilterModel
                        {
                            Title = y.Filter.Title,
                            Category = y.Filter.Category,
                        }).ToList(),
                    Images = x.Images.Select(x => x.Image).ToList(),
                    Sizes = x.FilterProducts.Where(k => k.Filter.Category == "розмір")
                        .Select(k => k.Filter.Title).ToList(),
                    Feedbacks = x.Feedbacks.Select(k => new FeedbackModel
                    {
                        Author = k.AuthorName,
                        Comment = k.Text,
                        Image = k.AuthorImage,
                    }).ToList(),
                }).First(x => x.Id == id);

            return Ok(product);
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("connectfilter")]
        public IActionResult ConnectFilter([FromBody] FilterConnection filterConnection)
        {
            AppFilterProduct appFilterProduct = new AppFilterProduct();

            appFilterProduct.ProductId = filterConnection.ProductId;
            appFilterProduct.FilterId = filterConnection.FilterId;

            _context.FilterProducts.Add(appFilterProduct);
            _context.SaveChanges();

            return Ok(appFilterProduct);
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("removefilter")]
        public IActionResult RemoveFilter([FromBody] FilterConnection filterConnection)
        {
            AppFilterProduct? appFilterProduct = _context.FilterProducts
                .FirstOrDefault(x => x.ProductId == filterConnection.ProductId
                    && x.FilterId == filterConnection.FilterId);

            if (appFilterProduct != null) 
            {
                _context.FilterProducts.Remove(appFilterProduct);
                _context.SaveChanges();
            }

            return Ok(appFilterProduct);
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpPost("connectsize")]
        public IActionResult ConnectSize([FromBody] SizeConnection sizeConnection)
        {
            AppSizeProduct appSizeProduct = new AppSizeProduct();

            appSizeProduct.ProductId = sizeConnection.ProductId;
            appSizeProduct.SizeId = sizeConnection.SizeId;

            _context.SizeProducts.Add(appSizeProduct);
            _context.SaveChanges();

            return Ok(appSizeProduct);
        }

        [HttpGet("count")]
        public IActionResult GetCount()
        {
            return Ok(_context.Products.Count());
        }
    }
}
