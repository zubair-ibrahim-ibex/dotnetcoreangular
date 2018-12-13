using System;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using StudentPortalAPI.Models;

namespace StudentPortalAPI.Dtos
{
    public class StudentWithCoursesDTO
    {
        [BsonId]
        public ObjectId Id { get; set; } 
        public string Name { get; set; }
        public string RollNo { get; set; }
        public string EnrollmentNo { get; set; }
        public List<ObjectId> CourseIds { get; set; }
        public List<Course> StudentWithCourses { get; set; }
    }
}