namespace DressShopBackend.Models
{
    public class LoginUserModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    
    public class ValidateUserModel
    {
        public string Token { get; set; }
    }
}
