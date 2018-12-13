import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  baseURL: string = "http://localhost:5000/api/"; 
  progressBarVisibility:Boolean = false; 
  constructor() { }
  getBaseUrl() : string{
    return this.baseURL;
  }

  setProgressBarVisibility(status:Boolean){
    this.progressBarVisibility = status;
  }
}
