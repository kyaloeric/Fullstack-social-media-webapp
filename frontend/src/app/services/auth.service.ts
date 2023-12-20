// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4600/user'; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        // Assuming your backend returns the token in a property called 'token'
        // Adjust this based on your actual backend response structure
        map((response: any) => {
          const token = response.token;
          if (token) {
            // Store the token in local storage
            localStorage.setItem('token', token);
          }
          return response;
        })
      );
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Retrieve token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Remove token from local storage
  removeToken(): void {
    localStorage.removeItem('token');
  }
}
