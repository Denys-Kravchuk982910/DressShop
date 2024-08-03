namespace DressShopBackend.Models
{
    public class AddProductModel
    {
        public string Title { get; set; }
        public string Tag { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int Rate { get; set; }
    }

    public class EditProductModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Tag { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
    }

    class ProductFiltered
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDesc { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public List<FilterModel> Fiters { get; set; }
        public List<string> Images { get; set; }
        public List<string> Sizes { get; set; }
        public List<FeedbackModel> Feedbacks { get; set; }
    }

    public class FilterConnection
    {
        public int ProductId { get; set; }
        public int FilterId { get; set; }
    }
    
    public class SizeConnection
    {
        public int ProductId { get; set; }
        public int SizeId { get; set; }
    }
}
