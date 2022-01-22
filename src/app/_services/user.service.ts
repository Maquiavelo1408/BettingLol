import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroku_API, Local_API } from '../constants/api';

const API_URL = Local_API+'/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any>{
    return this.http.get(API_URL+'all',{responseType:'text'});
  }

  getUserBoard(): Observable<any>{
    return this.http.get(API_URL+'user',{responseType:'text'});
  }

  getModeratorBoard(): Observable<any>{
    return this.http.get(API_URL+'mod',{responseType:'text'});
  }

  getAdminBoard(): Observable<any>{
    return this.http.get(API_URL+'admin',{responseType:'text'});
  }
  modifyUser(id: string, dataObject: any): Observable<any>{
    httpOptions.headers.append('x-access-token', dataObject.accessToken);
    console.log(dataObject);
    console.log(httpOptions);
    return this.http.put(API_URL+'user/'+id,
      dataObject
    , httpOptions);
  }
}

