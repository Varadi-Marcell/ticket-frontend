import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../model/Ticket";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>('/apis/api/v1/user', );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>('/apis/api/v1/user/' + id);
  }

  getNormalUser() {
    return this.http.get<User>('/apis/api/v1/user/');
  }


  getUser() : Observable<User>{
    return this.http.get<User>('/apis/api/v1/user/profile').pipe(
      tap(data=>
        console.log(data)
      )
    );
  }
  updateUser(userForm:any):Observable<any>{
    return this.http.put('/apis/api/v1/user',userForm);
  }
  userGuard(id: number):Observable<boolean>{
    return this.http.post<boolean>('/apis/api/v1/user/guard',id);
  }
}
