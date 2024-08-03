using Microsoft.AspNetCore.Identity;

namespace DressShopBackend.Data.Entities.Identity
{
    public class AppUser : IdentityUser<long>
    {
        public string FullName { get; set; }
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
    }
}
