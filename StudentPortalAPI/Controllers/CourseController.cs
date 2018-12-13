using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using StudentPortalAPI.Models;
using StudentPortalAPI.Dtos;
using Microsoft.AspNetCore.Authorization;

namespace StudentPortalAPI.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    [Authorize]
    public class CourseController : ControllerBase
    {
        private ICourseRepository _courseRepository;
        private IStudentRepository _studentRepository;
        public CourseController(ICourseRepository service, IStudentRepository studentService)
        {
            this._courseRepository = service;       
            this._studentRepository = studentService;     
        }

        public ActionResult<IEnumerable<Course>> Get()
        {
            var courses = _courseRepository.GetAll();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public ActionResult<Course> Get(string Id)
        {
            var OId = ObjectId.Parse(Id);
            var course = this._courseRepository.Get(OId);
            return Ok(course);
        }

        [HttpPost]
        public ActionResult<Course> Post([FromBody] SimpleCourseDTO courseDto)
        {
            var course = new Course
            {
                Id = ObjectId.GenerateNewId(),
                Name = courseDto.Name,
                Code = courseDto.Code                
            };
            _courseRepository.Add(course);
            return course;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var OId = ObjectId.Parse(id);
            _studentRepository.RemoveCourseByStudentId(OId);
            _courseRepository.Remove(x => x.Id == OId);
            return Ok("Deleted");
        }

        [HttpPut("{id}")]
        public ActionResult<UpdateResult> Put(string id, [FromBody] Course course)
        {
            var OId = ObjectId.Parse(id);
            return this._courseRepository.Update(OId, course);
        }
    }
}