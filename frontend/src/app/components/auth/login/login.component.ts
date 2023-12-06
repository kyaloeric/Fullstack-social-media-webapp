// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

// }


// src/app/components/auth/login/login.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  focusEmailInput() {
    // Implement any additional logic if needed
  }

  focusPasswordInput() {
    // Implement any additional logic if needed
  }

  login() {
    // You can add login logic here
  }
}
