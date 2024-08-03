namespace DressShopBackend.Models
{
    public class AddOrderModelCollection
    {
        public int Count { get; set; }
        public string Size { get; set; }
        public int ProductId { get; set; }
    }

    public class AddOrderModel
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Deliver { get; set; }

        public List<AddOrderModelCollection> Products { get; set; }
    }
}
