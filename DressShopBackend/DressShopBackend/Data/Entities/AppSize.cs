namespace DressShopBackend.Data.Entities
{
    public class AppSize
    {
        public int Id { get; set; }
        public string Size { get; set; }
        public virtual ICollection<AppSizeProduct> SizeProducts { get; set; }
    }
}
