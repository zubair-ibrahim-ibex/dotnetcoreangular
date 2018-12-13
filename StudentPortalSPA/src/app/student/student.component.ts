import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {MatDialog} from '@angular/material'
import { StudentDialog } from './student.dialog';
import { StudentService } from '../student.service';
import { CourseService } from '../course.service';
import { Student } from '../student';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  students: Student[];
  displayedColumns: string[] = ['name', 'rollNo', 'enrollmentNo', 'studentWithCourses', 'actions'];
  dataSource : any;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getStudent();
  }

  getStudent(){
    this.settingService.setProgressBarVisibility(true);
    this.studentService.get().subscribe((students:Student[]) => {
      this.students = students;
      this.dataSource = new MatTableDataSource(students);
      this.dataSource.sort = this.sort;
      this.settingService.setProgressBarVisibility(false);
    });
  }

  constructor(
      public dialog: MatDialog, 
      public studentService: StudentService, 
      public courseService: CourseService,
      public settingService: SettingsService
  ) {}
   
  openDialog() {
    const dialogRef = this.dialog.open(StudentDialog, { data: { type: 'CREATE' } });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'STUDENT_SAVED'){
        this.getStudent();
      }
    });
  }

  delete(id){
    let isConfirm = confirm("Are you sure");
    if(isConfirm){
      this.studentService.delete(id).subscribe((result) => {
        this.getStudent();
      });
    }
  }

  edit(element){
    const dialogRef = this.dialog.open(StudentDialog, { data: { ...element, type: 'EDIT' } });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'STUDENT_EDITED'){
        console.log(1);
      }
    });
  }
}
