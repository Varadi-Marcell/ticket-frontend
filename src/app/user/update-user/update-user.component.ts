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
  currentUser: User;
  user: User;
  userForm:FormGroup;
  selectedRole: any;
  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder:FormBuilder,
              private userService:UserService,) {
  }

   ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.user = this.activatedRoute.snapshot.data['user'];
     this.userForm = this.formBuilder.group({
       // admin: ID-t leküldi, user: id-t nem küldi le
      id: new FormControl({value: this.user.id, disabled: true}, Validators.required),
      name: [this.user.name,Validators.required],
      email: [this.user.email,Validators.required],
      age: [this.user.age,Validators.required],
      role: [this.user.role, [Validators.required]],
    });
    this.roleType = this.userForm.controls['role'] as FormControl;

  }

  onSubmit() {
    console.log(this.userForm.value);
    console.log(this.userForm.getRawValue());
    const requestBody = this.currentUser.role === 'ADMIN' ? this.userForm.getRawValue() : this.userForm.value;
    this.userService.updateUser(requestBody).subscribe();
  }
}
