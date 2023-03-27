import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../model/User";
import {StompService} from "./stomp.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(null);

  user = this.userSubject.asObservable();
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn = this._isLoggedIn$.asObservable();

  constructor(private http:HttpClient) {
    this._isLoggedIn$.next(!!this.getUser());
     this.userSubject.next(this.getUser());
  }

  login(email: string,password : string):Observable<{ token: string, userDto:User }>{
    return this.http.post<{token:string,userDto:User}>('/apis/api/v1/auth/authenticate',{email,password})
      .pipe(
        tap( res => {
          this.userSubject.next(res.userDto);
          this._isLoggedIn$.next(true);
        })
      );
  }

  register(name:string, email: string, password: string):Observable<any> {
    return this.http.post<any>('/apis/api/v1/auth/register', { "name":name, "email":email,"password":password });
  }
  getToken(): string | null {
    return localStorage.getItem("JWT_TOKEN");
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.http.post('/apis/logout', {}).subscribe(
      () => {
        this.userSubject.next(null);
        this._isLoggedIn$.next(false);
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem('user');
      }
    );
  }

}
