using System;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq.Expressions;
using StudentPortalAPI.Data;
using MongoDB.Driver;
using StudentPortalAPI.Models;

public class CourseRepository : Repository<Course>, ICourseRepository
{
    public CourseRepository(IDBContext context) : base(context, "courses")
    {
    }
    
    public UpdateResult Update(ObjectId Id, Course course)
    {
        var filter = Builders<Course>.Filter.Eq("Id", Id);
        var update = Builders<Course>.Update.Set("Name", course.Name).Set("Code", course.Code);
        return _collection.UpdateOne(filter, update);
    }
}