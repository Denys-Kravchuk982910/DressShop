namespace DressShopBackend.Data.Entities
{
    public class AppOrderProduct
    {
        public int Count { get; set; }
        public string Size { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public AppOrder Order { get; set; }
        public AppProduct Product { get; set; }
    }
}
