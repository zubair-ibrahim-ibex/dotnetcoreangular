import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { Course } from './course';
import { HttpClient } from '@angular/common/http';
import { BasicHttpOperations } from './basic.http.operations';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends BasicHttpOperations<Course> {
  protected url : string = "course";
  constructor(
    protected settingService: SettingsService,
    protected http: HttpClient,
  ) { super(http, settingService) }
}
