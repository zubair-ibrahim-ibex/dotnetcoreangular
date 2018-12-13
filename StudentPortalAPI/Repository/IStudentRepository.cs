using System;
using System.Collections.Generic;
using StudentPortalAPI.Models;
using StudentPortalAPI.Dtos;
using MongoDB.Bson;
using MongoDB.Driver;

public interface IStudentRepository : IRepository<Student>
{
    IEnumerable<StudentWithCoursesDTO> GetAllStudentWithCourses();
    StudentWithCoursesDTO GetStudentWithCourses(ObjectId id);
    UpdateResult RemoveCourseByStudentId(ObjectId id);
    UpdateResult Update(ObjectId id, SimpleStudentDTO student);
    Student AddWithCourseIds(SimpleStudentDTO studentDTO);
}