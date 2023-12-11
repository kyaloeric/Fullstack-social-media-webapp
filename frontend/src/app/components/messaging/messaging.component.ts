import { Component } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent {
  chatList = [
    {
      id: 1,
      name: 'Eric Kyalo',
      lastMessage: 'How have you been?',
      avatar: '/assets/images/profile-image.jpg'
    },
    {
      id: 2,
      name: 'John Doe',
      lastMessage: 'Hello there!',
      avatar: '/assets/images/profile-image.jpg'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      lastMessage: 'Meeting at 3 PM?',
      avatar: '/assets/images/profile-image.jpg'
    },
    {
      id: 4,
      name: 'Bob Smith',
      lastMessage: 'Sure, we will catch up!',
      avatar: '/assets/images/profile-image.jpg'
    },
    // Add more chat items as needed
  ];


  openChat: any = null; // You might want to create a Chat interface for better typing

  // Method to open chat details
  openChatDetails(chat: any) {
    this.openChat = chat;
  }


  // Other component logic...
}
