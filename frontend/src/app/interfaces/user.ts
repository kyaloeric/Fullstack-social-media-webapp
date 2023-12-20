// export interface User{
//     id: 1,
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     contactNumber: '1234567890',
//     address: '123 Main Street',
//     city: 'Cityville',
//     country: 'Countryland'
//   };


  export interface User {
    username: string;
    profileImage: string;
    isFollowing: boolean;
  }
  
  export interface UserDetails {
    user_id: string;
    profileImage: string;
    fullName: string;
    email: string;
    username: string;
    phone_no: string;
    created_at: string;
  }
  
  export interface toggleFollowUserInterface {
    following_user_id: string;
    followed_user_id: string;
  }