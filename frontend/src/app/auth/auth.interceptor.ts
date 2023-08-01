import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const refreshToken = localStorage.getItem('refreshToken');

    if(refreshToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + refreshToken)
      });

      return next.handle(cloned);

    } else {
      return next.handle(req);
    }

  }
}
