using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace StudentPortalAPI.Dtos
{
    public class SimpleCourseDTO
    {
        public string Id { get; set; } 

        [Required, MaxLength(40), MinLength(3)] 
        public string Name { get; set; }

        [Required, MaxLength(40), MinLength(3)] 
        public string Code { get; set; }
    }
}