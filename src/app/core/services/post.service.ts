import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);
  baseUrl = environment.baseUrl;

  getAllPosts(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/posts');
  }

  getSinglePost(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/posts/${id}`);
  }

  createPost(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/posts`, data);
  }

  deletePost(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/posts/${id}`);
  }
}
