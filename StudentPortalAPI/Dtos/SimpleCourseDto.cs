using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace StudentPortalAPI.Dtos
{
    public class SimpleCourseDTO
    {
        public string Id { get; set; } 
        public string Name { get; set; }
        public string Code { get; set; }
    }
}