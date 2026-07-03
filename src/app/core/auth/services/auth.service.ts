import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  signup(data: Object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/users/signup`, data);
  }
  signin(data: Object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/users/signin`, data);
  }
}
