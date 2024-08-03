namespace DressShopBackend.Data.Entities
{
    public class AppSizeProduct
    {
        public AppProduct Product { get; set; }
        public AppSize Size { get; set; }
        public int ProductId { get; set; }
        public int SizeId { get; set; }
    }
}
