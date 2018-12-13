using System;
using MongoDB.Bson;
using MongoDB.Driver;
using StudentPortalAPI.Models;

public interface ICourseRepository : IRepository<Course>
{
    UpdateResult Update(ObjectId Id, Course course);
}