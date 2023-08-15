import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/models/user';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../config/global-constants';

@Injectable()
export class UsersService {

  url = GlobalConstants.API_URL + '/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url + '/profile');
  }

  updateUser(user: any): Observable<User> {
    return this.http.patch<User>(this.url + '/profile', user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.url + '/' + id);
  }

}
