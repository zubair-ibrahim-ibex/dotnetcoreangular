using System;
using System.Collections.Generic;
using StudentPortalAPI.Models;
using StudentPortalAPI.Dtos;
using MongoDB.Bson;
using MongoDB.Driver;

public interface IUserRepository : IRepository<User>
{
    User GetUserByEmailAndPassword(string email, string password);
    User Register(User user);
    User IsExists(string email);
    User Authenticate(string email, string password);
}