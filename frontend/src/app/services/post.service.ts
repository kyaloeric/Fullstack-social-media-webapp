// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PostService {
//   private apiUrl = 'http://localhost:4600/post'; // Update the URL accordingly

//   constructor(private http: HttpClient) {}

//   private getHeaders(): HttpHeaders {
//     // Fetch the token from local storage
//     const token = localStorage.getItem('token');

//     // Set up headers
//     return new HttpHeaders({
//       'Content-Type': 'application/json',
//       'token': token || ''
//     });
//   }

//   createPost(postData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/addnew`, postData, { headers: this.getHeaders() });
//   }

//   updatePost(postData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/edit`, postData, { headers: this.getHeaders() });
//   }

//   deletePost(postId: string): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${postId}`, { headers: this.getHeaders() });
//   }

//   getPosts(): Observable<any> {
//     return this.http.get(`${this.apiUrl}/getall`, { headers: this.getHeaders() });
//   }

//   getPostById(postId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${postId}`, { headers: this.getHeaders() });
//   }

//   likePost(likeData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/likePost`, likeData, { headers: this.getHeaders() });
//   }

//   getPostLikes(postId: string): Observable<any> {
//     return this.http.get(`${this.apiUrl}/like/${postId}`, { headers: this.getHeaders() });
//   }
// }



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostDetails, updatePost} from '../interfaces/post'
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'http://localhost:4600/post';

  // Helper function to get headers with token
  private getHeadersWithToken(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });
  }

  constructor(private http: HttpClient) {}

  createPost(postData: PostDetails, token: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/addnew`, postData, {
      headers: this.getHeadersWithToken(token),
    });
  }

  updatePost(postData: updatePost, token: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/edit`, postData, {
      headers: this.getHeadersWithToken(token),
    });
  }

  deletePost(postId: string, token: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getAllPosts(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getall`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getOnePost(postId: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  toggleLikePost(
    postId: string,
    userId: string,
    token: string
  ): Observable<any> {
    const body = { post_id: postId, user_id: userId };
    return this.http.post(`${this.baseUrl}/likePost`, body, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getPostLikes(postId: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/like/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }

  getPostdetails(postId: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/details/${postId}`, {
      headers: this.getHeadersWithToken(token),
    });
  }
}