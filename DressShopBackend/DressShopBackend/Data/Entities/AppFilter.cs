namespace DressShopBackend.Data.Entities
{
    public class AppFilter
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }

        public virtual ICollection<AppFilterProduct> FilterProducts { get; set; }
    }
}
