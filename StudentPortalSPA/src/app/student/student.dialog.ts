import { Component, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { SettingsService } from '../settings.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface StudentDialogData {
  id: string,
  name: string,
  rollNo: string,
  enrollmentNo: string,
  courseIds: [string],
  studentWithCourses: [Course],
  type: string
}

@Component({
    selector: 'student-dialog',
    templateUrl: './student.dialog.html',
    styleUrls: ['./student.dialog.scss']
})
export class StudentDialog implements OnInit {
    student: Student = {
      id: '',
      name: '',
      rollNo: '',
      enrollmentNo: '',
      courseIds: [''],
      studentWithCourses: [
        {
          id: '',
          name: '',
          code: ''
        }
      ],
    };
    
    courses: Course[];
    inputCourses: Course[] = [];
    emptyArray = [];
    @Output() onStudentAdded = new EventEmitter();

    constructor(
      private studentService: StudentService, 
      private courseService: CourseService, 
      private settingService: SettingsService,
      @Inject(MAT_DIALOG_DATA) public data: StudentDialogData,
      private dialogRef: MatDialogRef<StudentDialog> ) {}

    ngOnInit(): void {
      if(this.data.type === "EDIT"){
        this.student.id = this.data.id;
        this.student.name = this.data.name;
        this.student.rollNo = this.data.rollNo;
        this.student.enrollmentNo = this.data.enrollmentNo;
        this.inputCourses = this.data.studentWithCourses;
      }
    }

    onSubmit(e, value: Student){
      e.preventDefault();      
      var courseIds : string[] = [];      
      this.inputCourses.map((course) => {
        courseIds.push(course.id);
      });
      this.settingService.setProgressBarVisibility(true);      
      value.courseIds = courseIds as [string];
      if(this.data.type === "CREATE"){
        this.studentService.add(value).subscribe((student) => {
          this.settingService.setProgressBarVisibility(false);
          this.settingService.getToaster().success("Created");
          this.dialogRef.close("STUDENT_SAVED");
        },(errors) => {
            this.settingService.setProgressBarVisibility(false);
            this.settingService.showValidationErrors(errors.error);
          });
        }else if(this.data.type === "EDIT"){
        this.studentService.edit(this.student.id, value).subscribe((courseResponse) => {
          this.settingService.setProgressBarVisibility(false);
          this.settingService.getToaster().success("Updated");
          this.dialogRef.close("STUDENT_SAVED");
        }, (errors) => {
          this.settingService.setProgressBarVisibility(false);
          this.settingService.showValidationErrors(errors.error);
        });
      }
    }

    onAssign(data){
      this.inputCourses = data;
    }
}