import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SettingsService } from '../settings.service';
import { CourseDialog } from './course.dialog';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
 
  constructor(
    private courseService: CourseService, 
    public dialog: MatDialog,
    private settingService: SettingsService, ) { }

  courses: Course[];
  displayedColumns: string[] = ['name', 'code', 'actions'];
  dataSource : any;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getCourses();
  }

  getCourses(){
    this.settingService.setProgressBarVisibility(true);
    this.courseService.get().subscribe((courses:Course[]) => {
      this.courses = courses;
      this.dataSource = new MatTableDataSource(courses);
      this.dataSource.sort = this.sort;
    this.settingService.setProgressBarVisibility(false);
    });
  }

  openDialog(){
    const dialogRef = this.dialog.open(CourseDialog, { data: { type: 'CREATE' } });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'COURSE_SAVED'){
        this.getCourses();
      }
    });
  }

  delete(id){
    let isConfirm = confirm("Are you sure");
    if(isConfirm){
      this.courseService.delete(id).subscribe((result) => {
        this.settingService.getToaster().success("Deleted");
        this.getCourses();
      }, (error) => {
        this.settingService.getToaster().error("Sorry try later");
      });
    }
  }

  edit(element){
    const dialogRef = this.dialog.open(CourseDialog, { data: { ...element, type: 'EDIT' } });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 'COURSE_SAVED'){
        this.getCourses();
      }
    });
  }

}
