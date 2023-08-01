import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtTokens } from './models/jwt-tokens';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<JwtTokens> {
    return this.http.post<JwtTokens>('http://localhost:3000/auth/login', {
      email: email,
      password: password,
    })
  }

  logout() {
    return this.http.get('http://localhost:3000/auth/logout');
  }

}
