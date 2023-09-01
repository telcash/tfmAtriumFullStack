import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/models/user';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../config/global-constants';

/**
 * Servicio encargado de las peticiones al endpoint '/users' del API
 */
@Injectable()
export class UsersService {

  // URL base para las peticiones
  url = GlobalConstants.API_URL + '/users';

  constructor(private http: HttpClient) {}

  /**
   * Solicita al API un listado de todos los usuarios
   * @returns {User[]} 
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  /**
   * Solicita al API la creación de un usuario
   * @param {User} user - Datos para crear el usuario
   * @returns {user} - Usuario creado
  */
 createUser(user: User): Observable<User> {
   return this.http.post<User>(this.url, user);
  }
  
  /**
   * Solicita al API, por parte de un usuario autenticado, su perfil
   * @returns {User}
   */
  getUser(): Observable<User> {
    return this.http.get<User>(this.url + '/profile');
  }
  
  /**
   * Solicita al API, por parte de un usuario autenticado, actualizar sus datos
   * @param {User} user - Datos para actualizar el usuario 
   * @returns {User} - Usuario actualizado
   */
  updateUser(user: any): Observable<User> {
    return this.http.patch<User>(this.url + '/profile', user);
  }

  /**
   * Solicita al API, por parte de un usuario autenticado, la eliminación de su cuenta
   * @returns {User} - Usuario eliminado
   */
  deleteUserAuth(): Observable<User>{
    return this.http.delete<User>(this.url + '/profile');
  }

  /**
   * Solicita al API la eliminación de un usuario
   * @param {number} id - Id del usuario
   * @returns {User} - Usuario eliminado
   */
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.url + '/' + id);
  }

}
