import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService.login(username, password).subscribe(
      (response) => {
        localStorage.setItem('JWT_TOKEN', response.token);
      }
    );
  }

// onSubmit(email: string, password: string) {
//   this.authService.login(email, password).subscribe(({token}) => {
//       localStorage.setItem('JWT_TOKEN', token);
//     }
//   )
// }

}
