import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  login(email: string,password : string):Observable<{ token: string }>{
    return this.http.post<{token:string}>('/api/api/v1/auth/login',{email,password});
  }
  register(name:string, email: string, password: string):Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    return this.http.post<any>('/apis/api/v1/auth/register',
      { "name":name, "email":email,"password":password }, httpOptions);
  }
}
