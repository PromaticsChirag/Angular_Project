import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})

export class LoginComponent {

  loading = false;
  errorMsg = '';
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  submit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    this.authService.login(this.loginForm.value as any).subscribe({
      next: (res) => {
        // success only
        localStorage.setItem('token', res.token);

        alert('Login successful! Hello, ' + res.user.name);
        this.router.navigate(['/homepage']);

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