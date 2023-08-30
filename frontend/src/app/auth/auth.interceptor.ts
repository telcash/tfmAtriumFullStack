import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtTokens } from './models/jwt-tokens';

/**
 * Interceptor que ejecuta la estrategia de seguridad de Json Web Tokens
 * Anexa a las solicitudes al API el token que corresponda: token de refrescamiento al punto de acceso 'auth/refresh' y token de acceso a los demás puntos
 * Si una solicitud a un endpoint diferente de los endpoints de 'auth/login' y 'auth/refresh' devuelve un error 401, el token de acceso (accessToken) está caducado
 * Al recibir el error, se hace automáticamente una solicitud por un nuevo token de acceso al endpoint 'auth/refresh', enviando el token de refrescamiento (refreshToken)
 * Si la solicitud de refrescamiento es exitosa, envía nuevamente la solicitud original que generó el error de acceso.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  /**
   * Implementación del método intercept del interceptor
   * @param req - Request
   * @param next - Objeto para invocar al próximo handler de la solicitud
   * @returns 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Guarda una copia de la solicitud original
    let firstReq = req;

    // Inicializa la solicitud de autorización
    let authReq = req;

    // Decide que token anexar a la solicitud
    // Si la solicitud se hace al endpoint 'auth/refresh', se envía el token de refrescamiento
    // Si la solicitud se hace a cualquier otro endpoint, se envía el token de acceso
    const token = req.url.includes('auth/refresh')
      ? localStorage.getItem('refreshToken')
      : localStorage.getItem('accessToken');
    
    // Si existe el token, clona la solicitud y lo anexa a los headers
    if(token) {
      authReq = req.clone({ headers: req.headers.set("Authorization", "Bearer " + token) });
    }

    // Envía la solicitud al próximo handler
    return next.handle(authReq).pipe(
      
      // Captura los errores que se generen en el handler
      catchError((error) => {

        // Verifica si el error es un HttpErrorResponse y la solicitud no se hizo al endpoint 'auth/login' o al endpoint 'auth/refresh' y el código del error es 401.
        if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/refresh') && !authReq.url.includes('auth/login') && error.status === 401) {
          
          // Si se verifica el error, el token de acceso está caducado, se invoca al método refreshTokens() para refrescar el token
          // Pasamos al método la solicitud original
          return this.refreshTokens(firstReq, next);
        }

        // Si es un error de otro tipo, devolvemos el error
        return throwError(() => error)
      })
    )
  }

  /**
   * Método que envía y gestiona la solicitud de refrescamiento de tokens
   * @param req - Request
   * @param next - Objeto para invocar al próximo handler de la solicitud
   * @returns 
   */
  private refreshTokens(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // LLamada al servicio para hacer la solicitud de refresacamiento de token al API
    return this.authService.refresh().pipe(

      // Si el refrescamiento es exitoso se obtiene una nueva pareja de token de acceso y token de refrescamiento
      switchMap((tokens: JwtTokens) => {

        // Almacena el token de acceso y el token de refrescamiento
        this.authService.setTokens(tokens);

        // Envía la solicitud original (donde se negó acceso por token caducado), anexando el nuevo token de acceso
        return next.handle(req.clone({ headers: req.headers.set("Authorization", "Bearer " + tokens.accessToken) }));
      }),

      // Si hay errores en el refrescamiento del token, devolvemos el error.
      catchError((err) => {
        return throwError(() => err);
      }));
  }

}