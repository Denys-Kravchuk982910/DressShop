namespace DressShopBackend.Models
{
    public class FilterModel
    {
        public string Title { get; set; }
        public string Category { get; set; }
    }

    public class CreateFilterModel
    {
        public string Title { get; set; }
        public string Category { get; set; }
    }

    public class EditFilterModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
    }

    public class DeleteFilterModel
    {
        public int Id { get; set; }
    }
}
