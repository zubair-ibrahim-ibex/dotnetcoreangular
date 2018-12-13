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
    public class StudentController : ControllerBase
    {
        private ICourseRepository _courseRepository;
        private IStudentRepository _studentRepository;
        public StudentController(ICourseRepository service, IStudentRepository studentService)
        {
            this._courseRepository = service;       
            this._studentRepository = studentService;     
        }

        public ActionResult<IEnumerable<StudentWithCoursesDTO>> Get()
        {
            var students = _studentRepository.GetAllStudentWithCourses();
            return Ok(students);
        }

        [HttpGet("{id}")]
        public ActionResult<StudentWithCoursesDTO> Get(string Id)
        {
            var OId = ObjectId.Parse(Id);
            var student = this._studentRepository.GetStudentWithCourses(OId);
            return Ok(student);
        }

        [HttpPost]
        public ActionResult<Student> Post([FromBody] SimpleStudentDTO student)
        {
            return _studentRepository.AddWithCourseIds(student);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var OId = ObjectId.Parse(id);
            _studentRepository.Remove(x => x.Id == OId);
            return Ok("Deleted");
        }

        [HttpPut("{id}")]
        public ActionResult<UpdateResult> Put(string id, [FromBody] SimpleStudentDTO student)
        {
            var OId = ObjectId.Parse(id);
            return this._studentRepository.Update(OId, student);
        }
    }
}