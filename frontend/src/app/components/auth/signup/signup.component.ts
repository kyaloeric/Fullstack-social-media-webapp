// src/app/components/auth/signup/signup.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,  private router: Router) {
    this.signupForm = this.fb.group({
      user_name: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', Validators.required],
      privacyPolicy: [false, Validators.requiredTrue],
      termsOfService: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatchValidator })
  }

  signup() {
    if (this.signupForm.valid) {
      const userData = {
        user_name: this.signupForm.value.user_name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        fullName: this.signupForm.value.fullName
      };

      this.authService.signup(userData).subscribe(
        (response) => {
          console.log('Signup successful', response);
          // Handle success, e.g., redirect to login page
          this.router.navigate(['/login']);

        },
        (error) => {
          console.error('Signup failed', error);
          // Handle error, e.g., display an error message
        }
      );
    } else {
      // Handle invalid input
      console.error('Invalid form input');
    }
  }

  // ...

  passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    const privacyPolicy = group.get('privacyPolicy')?.value;
    const termsOfService = group.get('termsOfService')?.value;

    // Check if passwords match
    const passwordsMatch = password === rePassword;

    // Check if checkboxes are checked
    const checkboxesChecked = privacyPolicy && termsOfService;

    // Return validation errors if conditions are not met
    return passwordsMatch && checkboxesChecked ? null : { passwordsNotMatchOrUnchecked: true };
  };

}