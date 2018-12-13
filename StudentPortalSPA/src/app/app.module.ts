import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule }    from '@angular/forms';

import { 
    MatToolbarModule, 
    MatMenuModule, 
    MatIconModule,
    MatButtonModule, 
    MatTableModule, 
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatProgressBarModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { MoverComponent } from './mover/mover.component';
import { StudentDialog } from './student/student.dialog';
import { CourseDialog } from './course/course.dialog';
import { StudentService  } from './student.service';
import { CourseService  } from './course.service';
import { SettingsService  } from './settings.service';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';

const JWT_Module_Options = JwtModule.forRoot({
  config: {
    tokenGetter: () => {
      return localStorage.getItem('token');
    },
    whitelistedDomains: ['localhost:4200']
  }      
});

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    CourseComponent,
    MoverComponent,
    StudentDialog,
    CourseDialog,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    HttpClientModule,
    MatProgressBarModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    JWT_Module_Options
  ],
  entryComponents: [
    StudentDialog,
    CourseDialog
  ],
  providers: [ StudentService, CourseService, SettingsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
