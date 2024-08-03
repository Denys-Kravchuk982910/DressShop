namespace DressShopBackend.Data.Entities
{
    public class AppImage
    {
        public int Id { get; set; }
        public string Image { get; set; }

        public virtual AppProduct Product { get; set; }
        public int ProductId { get; set; }
    }
}
