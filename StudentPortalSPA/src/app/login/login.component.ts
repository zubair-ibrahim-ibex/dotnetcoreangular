import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: Login = {
    email: '',
    password: ''
  }
  constructor(
    private auth: AuthService, 
    private router: Router,
    private setting: SettingsService
    ) { }

  ngOnInit() {
  }

  onSubmit(e, data: Login){
    this.auth.login(data).subscribe((user) => {
      let u = user as User;
      localStorage.setItem('token', u.token);
      localStorage.setItem('userInfo', JSON.stringify(u));
      this.router.navigate(['/students']);
      this.setting.getToaster().success("Successfully LoggedIn");
    }, (error) => {
      this.setting.getToaster().error(error.error.message);
    });
  }

}
