import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtTokens } from './models/jwt-tokens';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let firstReq = req;
    let authReq = req;
    const token = req.url.includes('auth/refresh')
      ? localStorage.getItem('refreshToken')
      : localStorage.getItem('accessToken');
    
    if(token) {
      authReq = req.clone({ headers: req.headers.set("Authorization", "Bearer " + token) });
    }
    return next.handle(authReq)
      .pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/refresh') && !authReq.url.includes('auth/login') && error.status === 401) {
          return this.refreshTokens(firstReq, next);
        }
        return throwError(() => error)
      }))
  }

  private refreshTokens(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.refresh().pipe(switchMap(
      (tokens: JwtTokens) => {
        this.authService.setTokens(tokens);
        const role = this.authService.getUserRole();
        this.authService.userLoggedIn.next(role);
        return next.handle(req.clone({ headers: req.headers.set("Authorization", "Bearer " + tokens.accessToken) }));
      }),
      catchError((err) => {
        return throwError(() => err);
      }));
  }

}