import { Component, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { SettingsService } from '../settings.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

interface CourseDialogData {
    id: string;
    name: string;
    code: string;
    type: string;
}

@Component({
    selector: 'course-dialog',
    templateUrl: './course.dialog.html',
    styleUrls: ['./course.dialog.scss']
})
export class CourseDialog implements OnInit {
    course: Course = { id: '', name: '', code: '' };
    courses: Course[];
    inputCourses: Course[] = [];
    emptyArray = [];

    constructor(
      private studentService: StudentService, 
      private courseService: CourseService, 
      private settingService: SettingsService,
      @Inject(MAT_DIALOG_DATA) public data: CourseDialogData,
      private dialogRef: MatDialogRef<CourseDialog> ) {}

    ngOnInit(): void {
        if(this.data.type === "EDIT"){
            this.course.id = this.data.id;
            this.course.name = this.data.name;
            this.course.code = this.data.code;
        }
    }

    onSubmit(e, course: Course){
        console.log(course);
        e.preventDefault();
        this.settingService.setProgressBarVisibility(true);
        if(this.data.type === "CREATE"){
            this.courseService.add(course).subscribe((courseResponse) => {
                this.settingService.setProgressBarVisibility(false);
                this.settingService.getToaster().success("Created");
                this.dialogRef.close("COURSE_SAVED");
            }, (errors) => {
                this.settingService.setProgressBarVisibility(false);
                this.settingService.showValidationErrors(errors.error);
            });
        }else if(this.data.type === "EDIT"){
            this.courseService.edit(this.course.id, course).subscribe((courseResponse) => {
                this.settingService.setProgressBarVisibility(false);
                this.settingService.getToaster().success("Updated");
                this.dialogRef.close("COURSE_SAVED");
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