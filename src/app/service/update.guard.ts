import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {UserResolver} from "./user.resolver";
import {User} from "../model/User";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UpdateGuard implements CanActivate {
  user;

  constructor(private authService: AuthService) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.user.subscribe(user => this.user = user);
    return true;

  }

}
