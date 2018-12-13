import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../course';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-mover',
  templateUrl: './mover.component.html',
  styleUrls: ['./mover.component.scss'],
})

export class MoverComponent implements OnInit {
  courses: Course[];
  filterdRemoteCourses: Course[] = [];
  filterdInputCourses: Course[] = [];
  remoteCourses: Course[] = [];
  @Input() inputCourses: Course[];
  aFilter: string;
  rFilter: string;
  selectedRemote:any;
  selectedInput:any;
  @Output() onAssign = new EventEmitter();
  @Input() createStudent;

  constructor(private studentService: StudentService, private courseService: CourseService) {}
  
  ngOnInit(): void {
    this.filterdInputCourses = this.inputCourses;
    this.courseService.get().subscribe((courses: Course[]) => {
      this.remoteCourses = courses;
      this.getAssignedCourses();
    });
  }

  remove(){
    let arr = [];
    let courses = this.filterdInputCourses.filter((course) => {
      if(this.selectedInput.indexOf(course.id) !== -1){
        return course;
      }else{
        arr.push(course);
        return null;
      }
    });
    Array.prototype.push.apply(this.filterdRemoteCourses, courses);
    this.filterdInputCourses = arr;
    this.onAssign.emit(this.filterdInputCourses);
  }

  assign(){
    let arr = [];
    let courses = this.filterdRemoteCourses.filter((course) => {
      if(this.selectedRemote.indexOf(course.id) !== -1){
        return course;
      }else{
        arr.push(course);
        return null;
      }
    });

    Array.prototype.push.apply(this.filterdInputCourses, courses);
    this.filterdRemoteCourses = arr;
    this.onAssign.emit(this.filterdInputCourses);
  }

  getAssignedCourses(){
    if(!this.remoteCourses)
      return;

    let courses = this.remoteCourses.filter((course) => {
        return course;
    });

    this.filterdRemoteCourses = courses;
    return courses;
  }


  findIdInArray(id){
    return this.inputCourses.find(x => x.id !== id);
  }

}
