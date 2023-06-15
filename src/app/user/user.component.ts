import {Component, DoCheck, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../model/User";
import {ToastrService} from "ngx-toastr";
import {tap} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  userArray: User[];
  constructor(private userService:UserService,
              private toastService: ToastrService) {

  }


  ngOnInit(): void {
      this.userService.getAllUser()
        .subscribe(
          data => {
            this.userArray = data;
          }
        );

  }

  deleteUserById(id: number) {
    this.userService.deleteUserById(id).pipe(
      tap(() => {
        this.toastService.error("User Removed!", "Info", {
          positionClass: "toast-bottom-center"
        });
      })
    ).subscribe();

  }
}
