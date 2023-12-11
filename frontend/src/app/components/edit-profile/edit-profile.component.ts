import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  isDropdownVisible: boolean = false;
  isNavVisible: boolean = false;

  constructor(private router: Router) {}

  confirmDiscard(): void {
    const isConfirmed = window.confirm("Are you sure you want to discard changes?");
    if (isConfirmed) {
      // Redirect to the profile popup or perform other actions
      this.router.navigate(['']);
    }
    // If not confirmed, do nothing or handle accordingly
  }


  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      // Perform any logic you need with the selected file
      // For example, you might want to display a preview of the image or upload it to a server.
      console.log('Selected file:', file);
  
      // You can update the profile image with the selected file.
      // For example, you might want to display a preview of the image or upload it to a server.
      // Assuming you have a method like updateProfileImage that takes the file as an argument.
      // this.userService.updateProfileImage(file).subscribe(response => {
      //   // Handle the response from the server, if needed
      // });
    }
  }



  toggleNav() {
    this.isNavVisible = !this.isNavVisible;}

}
