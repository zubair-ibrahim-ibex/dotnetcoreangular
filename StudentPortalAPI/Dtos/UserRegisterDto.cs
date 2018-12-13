using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace StudentPortalAPI.Dtos
{
  public class UserRegisterDto 
    {
        [Required]
        [StringLength(40, MinimumLength = 3, ErrorMessage = "Name Invalid")]
        public string Name { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(40, MinimumLength = 6, ErrorMessage = "Password Invalid")]
        public string Password { get; set; }
    }
}