import { Component } from '@angular/core';
import {User} from "../../model/User";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {StompService} from "../../service/stomp.service";

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent {

  roleProperty: Array<string> = Object.keys(Role).filter(key => isNaN(+key));
  roleType:FormControl;
  user: User;
  userForm:FormGroup;
  selectedRole: any;
  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder:FormBuilder,
              private userService:UserService,) {
  }

   ngOnInit() {
    this.user = this.activatedRoute.snapshot.data['user'];
     this.userForm = this.formBuilder.group({
      id: [this.user.id,Validators.required],
      name: [this.user.name,Validators.required],
      email: [this.user.email,Validators.required],
      age: [this.user.age,Validators.required],
      role: [this.user.role, [Validators.required]],
    });
    this.roleType = this.userForm.controls['role'] as FormControl;

  }

  onSubmit() {
    console.log(this.userForm.value);
    this.userService.updateUser(this.userForm.value).subscribe();
  }
}
