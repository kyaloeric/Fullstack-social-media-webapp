// Import necessary modules
import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  // Define a boolean variable to track password match status
  passwordsMatch: boolean = true;

  // Function to check password match
  checkPasswordMatch(newPassword: string, confirmNewPassword: string): void {
    this.passwordsMatch = newPassword === confirmNewPassword;
  }
}
