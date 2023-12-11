// my-profile-popup.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router'; // Import the Router service

@Component({
  selector: 'app-my-profile-popup',
  templateUrl: './my-profile-popup.component.html',
  styleUrls: ['./my-profile-popup.component.css']
})
export class MyProfilePopupComponent {
  @Input() user!: User; // Add this line
  @Input() userProfile!: User;
  @Output() editProfileClicked = new EventEmitter<void>();
  @Output() closePopup = new EventEmitter<void>(); // Renamed the EventEmitter

  isEditProfilePopupOpen: boolean = false;

  constructor(private router: Router) {} // Inject the Router service

  openEditProfile() {
    this.editProfileClicked.emit();
    // Redirect to the edit profile page with the current user data
    // Assuming your edit profile route is '/edit-profile/:id'
    this.router.navigate(['/edit-profile']); // Adjust the route as per your configuration

    // Close the popup
    this.onClosePopup();
  }

  // Renamed the method to avoid conflict
  onClosePopup() {
    this.isEditProfilePopupOpen = false;  }
}
