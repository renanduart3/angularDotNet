using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Agil.Domain.Identity
{
    public class User : IdentityUser<int>
    {
        public string FullName { get; set; }
        public List<UserRole> UserRoles { get; set; }
        
    }
}