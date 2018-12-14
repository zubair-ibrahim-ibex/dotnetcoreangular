import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BasicHttpOperations<TClass> {

    protected url : string = "";
    constructor(protected http: HttpClient, protected settingService: SettingsService){}

    getUrl() : string{
      return this.settingService.getBaseUrl() + this.url;
    }
    
    get (): Observable<TClass[]> {
        return this.http.get<TClass[]>(this.getUrl(), this.getHeaders());
    }

    add (entity): Observable<TClass> {
        return this.http.post<TClass>(this.getUrl(), entity, this.getHeaders());
    }

    edit(id, entity): Observable<TClass> {
        return this.http.put<TClass>(this.getUrl() + "/" + id, entity, this.getHeaders());
    }

    delete(id:string){
        return this.http.delete(this.getUrl() + "/" + id, this.getHeaders());
    }

    getById(id: string): Observable<TClass> {
        return this.http.get<TClass>(this.getUrl() + "/" + id, this.getHeaders());
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