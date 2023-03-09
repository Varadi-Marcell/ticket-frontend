import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {map} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../model/User";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

   isLoggedin = false;
   role: string = "GUEST";
   // user: User = this.authService.getUser();
  user: User;


  constructor(private authService: AuthService,
              private router: Router) {
  }
  // ngOnInit(): void {
  //   this.authService.isLoggedIn.subscribe(value => {
  //     this.isLoggedin = value;
  //     if (this.isLoggedin){
  //       this.authService.getUser().subscribe(user => {
  //         this.role = user.role;
  //       });
  //     } else {
  //       this.role = "GUEST";
  //     }
  //   });
  // }
  ngOnInit(): void {
    this.authService.user.subscribe(user => this.user = user);

    this.authService.isLoggedIn.subscribe(value => {
      this.isLoggedin = value;
      if (this.isLoggedin){
        this.role = this.user.role;
      } else {
        this.role = "GUEST";
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
