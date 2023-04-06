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

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private userResolver: UserResolver) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.user.subscribe(user => this.user = user);

    let value: boolean;
    return this.userResolver.resolve(route, state).pipe(
      switchMap((resolvedUser: User) => {
        return this.userService.userGuard(resolvedUser.id).pipe(
          map((value: boolean) => {
            if ((this.user.role === 'ADMIN') || value) {
              console.log(value);
              console.log(this.user.role==='ADMIN');
              return true;
            } else {
              this.router.navigate(['/']);
              return false;
            }
          }),
          catchError((error) => {
            this.router.navigate(['/']);
            return of(false);
          })
        );
      })
    );
  }

}
