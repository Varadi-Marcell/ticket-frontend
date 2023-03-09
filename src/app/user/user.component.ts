import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/User";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userArray: User[];
  constructor(private userService:UserService) {

  }
  ngOnInit(): void {
      this.userService.getAllUser()
        .subscribe(
          data => {
            this.userArray = data;
          }
        );

  }

}
