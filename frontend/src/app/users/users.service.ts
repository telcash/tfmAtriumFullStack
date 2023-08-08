import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:3000/users/profile');
  }

  updateUser(user: Partial<User>): Observable<User> {
    return this.http.patch<User>('http://localhost:3000/users/profile', user);
  }


}
