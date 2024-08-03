namespace DressShopBackend.Data.Entities
{
    public class AppProduct
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Tag { get; set; } 
        public int Price { get; set; } 
        public string Description { get; set; }
        public int Rate { get; set; }
        public virtual ICollection<AppFeedback> Feedbacks { get; set; }
        public virtual ICollection<AppImage> Images { get; set; }
        public virtual ICollection<AppSizeProduct> SizeProducts { get; set; }
        public virtual ICollection<AppFilterProduct> FilterProducts { get; set; }
        public virtual ICollection<AppOrderProduct> OrderProducts { get; set; }
    }
}
