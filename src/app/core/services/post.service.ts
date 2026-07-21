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
  header: object = {
    headers: {
      authorization: `Bearer ${localStorage.getItem('rippleToken')}`,
    },
  };

  getAllPosts(): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/posts', this.header);
  }

  getSinglePost(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/posts/${id}`, this.header);
  }

  createPost(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/posts`, data, this.header);
  }

  deletePost(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/posts/${id}`, this.header);
  }
}
