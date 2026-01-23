import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  signup(payload: { fullname: string; email: string; pincode: string; city: string; state: string; password: string; confirm_password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, payload);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}