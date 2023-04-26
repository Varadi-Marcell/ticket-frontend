import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {map} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../model/User";
import {UserService} from "../service/user.service";
import {StompService} from "../service/stomp.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role: string = "GUEST";
  user: User;

  constructor(private authService: AuthService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.userSubject.subscribe(user => this.user = user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
