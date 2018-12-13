using System;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq.Expressions;
using StudentPortalAPI.Data;
using MongoDB.Driver;
using StudentPortalAPI.Models;
using StudentPortalAPI.Dtos;

public class StudentRepository : Repository<Student>, IStudentRepository
{
    public StudentRepository(IDBContext context) : base(context, "students")
    {
    }

    public Student AddWithCourseIds(SimpleStudentDTO studentDTO)
    {
        List<ObjectId> courseIds = new List<ObjectId>();
        foreach(var oId in studentDTO.CourseIds)
        {
            courseIds.Add(ObjectId.Parse(oId));
        }
        Student newStudent = new Student
        {
            Id = ObjectId.GenerateNewId(),
            Name = studentDTO.Name,
            RollNo = studentDTO.RollNo,
            EnrollmentNo = studentDTO.EnrollmentNo,
            CourseIds = courseIds
        };
        this.Add(newStudent);
        return newStudent;
    }

    public IEnumerable<StudentWithCoursesDTO> GetAllStudentWithCourses()
    {
        var lookup = new BsonDocument
        {
            {
                "$lookup",
                new BsonDocument
                {
                    { "from", "courses" },
                    { "localField", "CourseIds" },
                    { "foreignField", "_id" },
                    { "as", "StudentWithCourses" },
                }
            }
        };
        var pipeline = new[] { lookup };
        return _collection.Aggregate<StudentWithCoursesDTO>(pipeline).ToList();
    }

    public StudentWithCoursesDTO GetStudentWithCourses(ObjectId id)
    {
        var match = new BsonDocument
        {
            {
                "$match",
                new BsonDocument
                {
                    { "_id",  id }
                }
            }
        };
        var lookup = new BsonDocument
        {
            {
                "$lookup",
                new BsonDocument
                {
                    { "from", "courses" },
                    { "localField", "CourseIds" },
                    { "foreignField", "_id" },
                    { "as", "StudentWithCourses" },
                }
            }
        };
        var pipeline = new[] { match, lookup };
        return _collection.Aggregate<StudentWithCoursesDTO>(pipeline).FirstOrDefault();
    }

    public UpdateResult RemoveCourseByStudentId(ObjectId id)
    {
        var filter = Builders<Student>.Filter.Eq("CourseIds", id);
        var update = Builders<Student>.Update.Pull("CourseIds", id);
        return _collection.UpdateMany(filter, update);
    }

    public UpdateResult Update(ObjectId id, SimpleStudentDTO student)
    {
        List<ObjectId> courseIds = new List<ObjectId>();
        foreach(var oId in student.CourseIds)
        {
            courseIds.Add(ObjectId.Parse(oId));
        }

        var filter = Builders<Student>.Filter.Eq("Id", id);
        var update = Builders<Student>.Update.Set("Name", student.Name)
                                            .Set("RollNo", student.RollNo)
                                            .Set("EnrollmentNo", student.EnrollmentNo)
                                            .Set("CourseIds", courseIds);
        return _collection.UpdateOne(filter, update);
    }
}