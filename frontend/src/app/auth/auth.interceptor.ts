import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtTokens } from './models/jwt-tokens';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private cookieService: CookieService) {

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
        const role = this.cookieService.get('role') ?? '';
        this.authService.userLoggedIn.next(role);
        return next.handle(req.clone({ headers: req.headers.set("Authorization", "Bearer " + tokens.accessToken) }));
      }),
      catchError((err) => {
        return throwError(() => err);
      }));
  }












  
  /* private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;

    if(!this.isRefreshing) {
      const token = localStorage.getItem('accessToken');
      if (token != null) {
        authReq = this.addTokenHeader(req, token);
      }
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/signin') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(() => error);
    }));

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      
      const token = localStorage.getItem('refreshToken');

      if (token)
        return this.authService.refresh(token).pipe(
          switchMap((tokens: JwtTokens) => {
            this.isRefreshing = false;

            localStorage.setItem('accessToken', tokens.accessToken);
            this.refreshTokenSubject.next(tokens.accessToken);
            
            return next.handle(this.addTokenHeader(request, tokens.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.deleteTokens();
            return throwError(() => err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set("Authorization", "Bearer " + token) });
  } */
}