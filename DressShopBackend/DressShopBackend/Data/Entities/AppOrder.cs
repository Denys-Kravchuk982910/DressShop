namespace DressShopBackend.Data.Entities
{
    public class AppOrder
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Deliver { get; set; }
        public string Status { get; set; }
        public virtual ICollection<AppOrderProduct> OrderProducts { get; set; }
    }
}
