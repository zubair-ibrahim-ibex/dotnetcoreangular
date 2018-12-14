using System;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using StudentPortalAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace StudentPortalAPI.Dtos
{
    public class SimpleStudentDTO
    {
        public string Id { get; set; }

        [Required, MaxLength(40), MinLength(3)] 
        public string Name { get; set; }

        [Required, MaxLength(20), MinLength(3)] 
        public string RollNo { get; set; }

        [Required, MaxLength(20), MinLength(3)] 
        public string EnrollmentNo { get; set; }

        [Required] 
        public List<string> CourseIds { get; set; }
    }
}