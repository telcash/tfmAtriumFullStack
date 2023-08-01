import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtTokens } from './models/jwt-tokens';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  userLoggedIn = new Subject<void>();
  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  login(email: string, password: string): Observable<JwtTokens> {
    return this.http.post<JwtTokens>('http://localhost:3000/auth/login', {
      email: email,
      password: password,
    })
  }

  logout() {
    return this.http.get('http://localhost:3000/auth/logout');
  }

  isUserLogged(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }

  setTokens(tokens: JwtTokens) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  deleteTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
