import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from './settings.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'StudentPortalSPA';
  constructor(
    private settingService: SettingsService,
    private authService: AuthService, 
    private cdRef: ChangeDetectorRef,
    private router: Router){}
  
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  logout(){
    this.authService.logout().subscribe((logout) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      this.router.navigate(['/login']);
    });
  }

  getUser(){
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) as User;
    return userInfo;
  }

}
