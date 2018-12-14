using System;
using MongoDB.Bson;
using MongoDB.Driver;
using StudentPortalAPI.Dtos;
using StudentPortalAPI.Models;

public interface ICourseRepository : IRepository<Course>
{
    UpdateResult Update(ObjectId Id, SimpleCourseDTO courseDto);
}