// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isMyProfilePopupOpen: boolean = false;
  currentUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    contactNumber: '1234567890',
    address: '123 Main Street',
    city: 'Cityville',
    country: 'Countryland'
  };

  constructor(private router: Router) {}

  openMyProfilePopup() {
    this.isMyProfilePopupOpen = true;
  }

  openEditProfilePage() {
    this.router.navigate(['/edit-profile']);
    this.isMyProfilePopupOpen = false;
  }

  // Add these methods to your component class
openFileUpload(type: 'image' | 'video'): void {
  // Trigger the corresponding file input
  if (type === 'image') {
    document.getElementById('imageUpload')?.click();
  } else if (type === 'video') {
    document.getElementById('videoUpload')?.click();
  }
}

handleImageUpload(event: any): void {
  const file = event.target.files[0];

  if (file) {
    // Handle the image file, e.g., display a preview or upload to a server
    console.log('Selected image file:', file);
  }
}

handleVideoUpload(event: any): void {
  const file = event.target.files[0];

  if (file) {
    // Handle the video file, e.g., display a preview or upload to a server
    console.log('Selected video file:', file);
  }
}

}
