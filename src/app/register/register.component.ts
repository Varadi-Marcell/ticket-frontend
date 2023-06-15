import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  showError = false;
  errorMessage: string;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.maxLength(10), Validators.minLength(3), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.maxLength(10), Validators.minLength(3), Validators.required]),
    });
  }

  onSubmit() {

    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password)
      .pipe(
        tap((response) => {
          localStorage.setItem('JWT_TOKEN', response.token);
          this.router.navigate(['/login']);
        })
      )
      .subscribe({
        error: (error) => {
          this.showError = true;
          this.errorMessage = error.error;
        }
      });

  }
}
