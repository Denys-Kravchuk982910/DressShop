namespace DressShopBackend.Data.Entities
{
    public class AppFeedback
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string AuthorName { get; set; }
        public string AuthorImage { get; set; }
        public int Rate { get; set; }

        public virtual AppProduct Product { get; set; }
        public int ProductId { get; set; }
    }
}
