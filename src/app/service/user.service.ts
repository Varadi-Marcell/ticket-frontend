import {Injectable} from '@angular/core';
import {EntityService} from "./EntityService";
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


//   return this.http.get<any>('your-url', { headers })
// .pipe(
//   tap(response => console.log('Response headers:', response.headers))
// );


  getAllUser(): Observable<User[]> {
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json')
    //   .set('Authorization', 'Bearer ' + localStorage.getItem("JWT_TOKEN"));

    return this.http.get<User[]>('/apis/api/v1/user', );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>('/apis/api/v1/user/' + id);
  }


  getUser() : Observable<User>{
    return this.http.get<User>('/apis/api/v1/user/profile');
  }
}
