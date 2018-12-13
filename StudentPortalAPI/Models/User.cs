using System;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace StudentPortalAPI.Models
{
    public class User 
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}