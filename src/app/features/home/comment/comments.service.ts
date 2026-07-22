import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import id from '@angular/common/locales/id';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);
  baseUrl = environment.baseUrl;

  getComments(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/posts/${id}/comments?page=1&limit=10`);
  }
  createComment(id: string, data: Object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/posts/${id}/comments`, data);
  }
}
