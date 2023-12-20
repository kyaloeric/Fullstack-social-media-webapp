// src/app/components/auth/login/login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  focusEmailInput() {
    // Implement any additional logic if needed
  }

  focusPasswordInput() {
    // Implement any additional logic if needed
  }
  login() {
    if (this.email && this.password) {
      // Call the login method from AuthService
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          // Handle successful login
          console.log('Login successful:', response);

          // Navigate to the home page upon successful login
          this.router.navigate(['']);
        },
        (error) => {
          // Handle login error
          console.error('Login error:', error);
        }
      );
    } else {
      // Handle invalid input
      console.error('Invalid email or password');
    }
  }
}
