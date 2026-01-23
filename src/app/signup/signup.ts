import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  loading = false;
  errorMsg = '';
  signupForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pincode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

   constructor(
      private authService: AuthService,
      private router: Router
    ) {}

  signup() {
    console.log(this.signupForm.value);
    if (this.signupForm.invalid) return;
    if (this.signupForm.value.password !== this.signupForm.value.confirm_password) {
      alert('Passwords do not match');
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.authService.signup(this.signupForm.value as any).subscribe({
      next: (res) => {
        // success only
        alert('Account Created Successfuly, ' + res.user.name);
        this.router.navigate(['/login']);

        this.loading = false;
      },
      error: (err) => {
        this.loading = false;

        // 👇 USER NOT FOUND / INVALID CREDENTIALS
        if (err.status === 401 || err.status === 404) {
          alert(err.error?.message || 'User not found or invalid credentials');
          return;
        }

        // 👇 OTHER ERRORS
        alert('Something went wrong. Please try again later.');
        console.error(err);
      }
    });
  }
}
