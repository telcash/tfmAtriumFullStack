import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JwtTokens } from './models/jwt-tokens';
import { User } from './models/user';
import { GlobalConstants } from '../config/global-constants';
import decode from 'jwt-decode';

/**
 * Servicio encargado de las peticiones a los endpoints '/auth' del API 
 * Peticiones relacionadas con las funciones de autorización
 */
@Injectable()
export class AuthService {

  // URL base para peticiones
  url = GlobalConstants.API_URL + '/auth';

  constructor(private http: HttpClient) {}

  // Subject para emitirse cuando un usuario inicie sesión
  // Emite el valor del rol del usuario que inicia sesión
  userLoggedIn = new Subject<string>();
  
  /**
   * Método que retorna un observable para registrarse como Observer de userLoggedIn
   * @returns {Onservable<string>} - Observable
   */
  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  /**
   * Solicita al API el registro de un nuevo usuario
   * @param {User} user - Datos del usuario a registrar 
   * @returns {User} - Usuario registrado
   */
  signup(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/signup', user);
  }

  /**
   * Solicitud al API de inicio de sesión de un usuario
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {JwtTokens} - Tokens de acceso y refrescamiento
   */
  login(email: string, password: string): Observable<JwtTokens> {
    return this.http.post<JwtTokens>(this.url + '/login', {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    })
  }

  /**
   * Solicitud al API de cierre de sesión de un usuario
   * @returns {User} - Usuario que cierra la sesión
   */
  logout(): Observable<User>{
    return this.http.get<User>(this.url + '/logout', {
      withCredentials: true,
    });
  }

  /**
   * Solicitud al API de refrescamiento de tokens de acceso y de refrescamiento
   * @returns {JwtTokens} - Tokens de acceso y refrescamiento
   */
  refresh(): Observable<JwtTokens> {
    return this.http.get<JwtTokens>(this.url + '/refresh', {
      withCredentials: true,
    });
  }

  /**
   * Solicitud al API para actualización de contraseña de un usuario
   * @param {string} password - Contraseña actual
   * @param {string} newPassword - Nueva contraseña
   * @param {string} passwordConfirmation - Confirmación de la nueva contraseña
   * @returns {User} - Usuario
   */
  updatePassword(password: string, newPassword: string, passwordConfirmation: string): Observable<User>{
    return this.http.patch<User>(this.url + '/password',
    {
      password: password,
      newPassword: newPassword,
      newPasswordConfirmation: passwordConfirmation,
    })
  }

  /**
   * Método que verifica si hay un usuario con sesión iniciada
   * @returns {boolean} - True si hay un usuario con sesión iniciada
   */
  isUserLogged(): boolean {
    let isUserLogged = false;

    // Obtiene el token de Local Storage en el navegador
    const token = localStorage.getItem('accessToken') ?? '';
    
    // Verifica la validez del token decodificándolo
    if(token) {
      try {
        decode(token);

        // Si existe el token y es válido hay un usuario con sesión iniciada
        isUserLogged = true
      } catch (error) {
        console.warn(error);
      }
    }
    
    return isUserLogged;
  }

  /**
   * Método que obtiene el rol del usuario con sesión iniciada
   * @returns {string} - Rol del usuario
   */
  getUserRole(): string {

    // Obtiene el token de acceso del Local Storage del navegador
    const token = localStorage.getItem('accessToken');

    // Si existe el token lo decodifica, obtiene el rol del payload del token y lo devuelve
    if(token) {
      try {
        const tokenPayload: any = decode(token);
        return tokenPayload.role;

      } catch (error) {
        console.warn(error);
      }
      ;
    }

    // Si no existe el token, o no es válido devuelve una cadena vacía
    return '';
  }

  /**
   * Método que almacena los tokens de acceso y de refrescamiento en el Local Storage del navegador
   * @param {JwtTokens} tokens - Tokens de acceso y de refrescamiento 
   */
  setTokens(tokens: JwtTokens) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  /**
   * Método que elimina los tokens de acceso y de refrescamiento del Local Storage del navegador
   */
  deleteTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
