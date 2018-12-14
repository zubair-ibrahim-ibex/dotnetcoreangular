import { Injectable } from '@angular/core';

declare var toastr;

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

  getProgressBarVisibility(): Boolean{
    return this.progressBarVisibility;
  }

  getToaster(){
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "4000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    return toastr;
  }

  showValidationErrors(errors: [string]){
      Object.keys(errors).forEach((error) => {
        errors[error].forEach((message) => {
          this.getToaster().error(message);
        });
      })
  }
}
