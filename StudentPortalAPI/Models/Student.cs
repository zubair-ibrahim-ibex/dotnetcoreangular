using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace StudentPortalAPI.Models
{
    public class Student
    {
        public ObjectId Id { get; set; } 
        public string Name { get; set; }
        public string RollNo { get; set; }
        public string EnrollmentNo { get; set; }
        public List<ObjectId> CourseIds { get; set; }
    }
}