namespace DressShopBackend.Data.Entities
{
    public class AppFilterProduct
    {
        public AppFilter Filter { get; set; }
        public AppProduct Product { get; set; }
        public int ProductId { get; set; }
        public int FilterId { get; set; }
    }
}
