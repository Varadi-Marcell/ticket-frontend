import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {User} from "../model/User";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ViewProfileResolver implements Resolve<User> {

  constructor(private service: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.service.getUser();
  }
}
