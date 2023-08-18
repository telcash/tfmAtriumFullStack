import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SetLoginCookiesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      const req = context.switchToHttp().getRequest();
      const role = req.user.role;
      const res = context.switchToHttp().getResponse();
      res.cookie('role', role, {
        expires: new Date(Date.now() + 3600 * 1000 ),
        sameSite: true,
      });
      return data;
    }));
  }
}
