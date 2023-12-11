import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  redirectToMessages(): void {
    // Navigate to the messages page
    this.router.navigate(['/messaging']); // Adjust the route as per your configuration
  }

  redirectToHome(): void {
    // Navigate to the messages page
    this.router.navigate(['']); // Adjust the route as per your configuration
  }

}
