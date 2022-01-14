import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Local_API } from '../constants/api';

const AUTH_API = Local_API +'/api/auth/';
//Heroku_API

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    return this.http.post(AUTH_API + 'signin',{
      username,
      password
    }, httpOptions);
  }

  register(username: string, email:string, password: string): Observable<any>{
    return this.http.post(AUTH_API+'signup',{
      username,
      email,
      password
    }, httpOptions);
  }
}
