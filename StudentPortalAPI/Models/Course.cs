using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace StudentPortalAPI.Models
{
    public class Course
    {
        public ObjectId Id { get; set; } 
        public string Name { get; set; }
        public string Code { get; set; }
    }
}