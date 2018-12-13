import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from './login';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "auth";
  constructor(
    private settingService: SettingsService, 
    protected http: HttpClient,
    public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(login: Login){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };  
    return this.http.post<Login>(this.getUrl() + "/login", login);
  }

  logout(){
    return this.http.post(this.getUrl() + "/logout", {}, this.getHeaders());
  }

  getUrl() : string{
    return this.settingService.getBaseUrl() + this.url;
  }

  getHeaders(){
    let token = localStorage.getItem('token');
    return {
        headers: new HttpHeaders(
            { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        )
    };  
}

}
