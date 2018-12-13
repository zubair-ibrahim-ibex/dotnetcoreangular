import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';
import { BasicHttpOperations } from './basic.http.operations';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BasicHttpOperations<Student> {
  url : string = "student";
  constructor(
    protected settingService: SettingsService,
    protected http: HttpClient,
  ) {
    super(http, settingService);
  }
}
