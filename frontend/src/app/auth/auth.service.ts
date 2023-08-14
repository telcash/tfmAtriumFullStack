import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtTokens } from './models/jwt-tokens';
import { User } from './models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  userLoggedIn = new Subject<string>();
  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/signup', user);
  }

  login(email: string, password: string): Observable<JwtTokens> {
    return this.http.post<JwtTokens>('http://localhost:3000/auth/login', {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    })
  }

  logout() {
    return this.http.get('http://localhost:3000/auth/logout');
  }

  refresh(): Observable<JwtTokens> {
    return this.http.get<JwtTokens>('http://localhost:3000/auth/refresh');
  }

  updatePassword(password: string, newPassword: string, passwordConfirmation: string) {
    return this.http.patch('http://localhost:3000/auth/password',
    {
      password: password,
      newPassword: newPassword,
      newPasswordConfirmation: passwordConfirmation,
    })
  }


  isUserLogged(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }

  isUserAdmin(): boolean {
    const role = this.cookieService.get('role') ?? '';
    if (role === 'ADMIN') {
      return true
    }
    return false;
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
