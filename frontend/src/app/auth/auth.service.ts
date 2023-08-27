import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtTokens } from './models/jwt-tokens';
import { User } from './models/user';
import { CookieService } from 'ngx-cookie-service';
import { GlobalConstants } from '../config/global-constants';
import decode from 'jwt-decode';

@Injectable()
export class AuthService {

  url = GlobalConstants.API_URL + '/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  userLoggedIn = new Subject<string>();
  
  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  signup(user: User): Observable<any> {
    return this.http.post<any>(this.url + '/signup', user);
  }

  login(email: string, password: string): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(this.url + '/login', {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    })
  }

  logout() {
    return this.http.get(this.url + '/logout', {
      withCredentials: true,
    });
  }

  refresh(): Observable<JwtTokens> {
    return this.http.get<JwtTokens>(this.url + '/refresh', {
      withCredentials: true,
    });
  }

  updatePassword(password: string, newPassword: string, passwordConfirmation: string) {
    return this.http.patch(this.url + '/password',
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

  userHasRole(role: string): boolean {
    const token = localStorage.getItem('refreshToken');
    if(token) {
      const tokenPayload: any = decode(token);
      if(tokenPayload.role === role) {
        return true;
      }
    }
    return false;
  }
}
