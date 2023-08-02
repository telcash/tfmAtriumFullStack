import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class SetCartItemCookieInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(map((data) => {
      const res = context.switchToHttp().getResponse();
      res.cookie(`pId_${data.productId}`, data.quantity, {
        expires: new Date(Date.now() + 3600*1000),
        sameSite: true,
      });
      return data;
    }));
  }
}
