import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {StompService} from "../service/stomp.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private stompService:StompService) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.maxLength(10), Validators.minLength(3), Validators.required]),
    });

  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.invalid) {
      return;
    }
    // this.authService.login(email, password).subscribe(
    //   async (response) => {
    //     localStorage.setItem('JWT_TOKEN', response.token);
    //     localStorage.setItem('user', JSON.stringify(response.userDto));
    //     await this.stompService.reconnect().then(() => {
    //       this.router.navigate(['/ticket']);
    //     });
    //   }
    // );
    this.authService.login(email,password).pipe(
      tap(async (response) => {
        localStorage.setItem('JWT_TOKEN', response.token);
        localStorage.setItem('user', JSON.stringify(response.userDto));
        await this.stompService.reconnect().then(() => {
          this.router.navigate(['/ticket']);
        });
      })
    ).subscribe({
      error: (error) => {
        document.getElementById('error').innerText = error.error;
      }
    })
  }

}
