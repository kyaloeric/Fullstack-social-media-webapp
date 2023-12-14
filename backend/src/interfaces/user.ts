
// export interface User {
//   userName: string;
//   userEmail: string;
//   userPassword: string;
//   role: string;

// }

export interface User{
    body: { email: any; password: any; };
    password: string;
    user_id: string;
    username: string;
    email: string;
  }
  
  export interface RegisterUserRequest {
    user_id: string;
    gender: string;
    username: string
    email: string;
    password: string;
    name: string
  }
  
  export interface LoginUserRequest {
    email: string;
    user_id: string;
    password: string;
    name: string
  }