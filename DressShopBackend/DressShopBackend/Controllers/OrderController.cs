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
    public class OrderController : ControllerBase
    {
        private EFContext _context;
        public OrderController(EFContext context)
        {
            _context = context;
        }

        [HttpPost("add")]
        public IActionResult AddOrderProduct([FromBody] AddOrderModel orderModels)
        {
            AppOrder order = new AppOrder
            {
                Name = orderModels.Name,
                Surname = orderModels.Surname,
                Email = orderModels.Email,
                Phone = orderModels.Phone,
                Deliver = orderModels.Deliver,
            };


            _context.Orders.Add(order);
            _context.SaveChanges();

            foreach (var orderModel in orderModels.Products)
            {
                AppOrderProduct orderProduct = new AppOrderProduct
                {
                    Order = order,
                    ProductId = orderModel.ProductId,
                    Size = orderModel.Size,
                    Count = orderModel.Count
                };

                _context.OrderProducts.Add(orderProduct);
            }

            _context.SaveChanges();

            return Ok(new
            {
                Id = order.Id,
            });
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("get")]
        public IActionResult GetOrders()
        {
            var nullOrders = _context.Orders.Include(x => x.OrderProducts)
                .ThenInclude(x => x.Product).Where(x => x.OrderProducts.Count == 0);

            foreach (var orderModel in nullOrders) 
            { 
                _context.Orders.Remove(orderModel);
            }

            _context.SaveChanges();

            return Ok(_context.Orders.Include(x => x.OrderProducts)
                .ThenInclude(x => x.Product).ThenInclude(x => x.Images).Select(x => new
            {   
                Id = x.Id,
                Name = x.Name,
                Surname = x.Surname,
                Email = x.Email,
                Phone = x.Phone,
                Status = x.Status,
                Products = x.OrderProducts.Select(y => new {
                    Product = new
                    {
                        Id = y.ProductId,
                        Title = y.Product.Title,
                        Tag = y.Product.Tag,
                        Count = y.Count,
                        Size = y.Size,
                        Price = y.Product.Price,
                        Image = y.Product.Images.First().Image
                    },
                    Count = y.Count,
                }),
            }));
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("remove")]
        public IActionResult RemoveOrder([FromQuery] int? id)
        {
            if (id != null) 
            {
                var order = _context.Orders.FirstOrDefault(x => x.Id == id);

                if (order != null) 
                {
                    foreach (var item in _context.OrderProducts.Where(x => x.OrderId == id))
                    {
                        _context.OrderProducts.Remove(item);
                    }

                    _context.Orders.Remove(order);

                    _context.SaveChanges(); 
                    
                    return Ok(order);
                }
            }

            return BadRequest();
        }

        [Authorize(Roles = Roles.ADMIN)]
        [HttpGet("changestatus")]
        public IActionResult ChangeStatus([FromQuery] string status, [FromQuery] int id) 
        {
            var order = _context.Orders.FirstOrDefault(x => x.Id == id);

            if (order != null) 
            {
                order.Status = status; 
                _context.SaveChanges();
            }

            return Ok(order);
        }
    }
}
