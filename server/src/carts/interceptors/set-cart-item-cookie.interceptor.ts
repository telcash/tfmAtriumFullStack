import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Response } from 'express';
import { map } from 'rxjs';

@Injectable()
export class SetCartItemCookieInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(map((data) => {
      
      const req = context.switchToHttp().getRequest();
      const res: Response = context.switchToHttp().getResponse();
      
      if(req.method === 'DELETE') {
        res.cookie(`pId_${data.productId}`, data.quantity, {
          expires: new Date(Date.now() - 1),
          sameSite: true,
        });
        return data;
      }

      if(isArray(data)) {
        for(const item of data) {
          res.cookie(`pId_${item.productId}`, item.quantity, {
            expires: new Date(Date.now() + 3600*1000),
            sameSite: true,
          });
        }
      } else {
        res.cookie(`pId_${data.productId}`, data.quantity, {
          expires: new Date(Date.now() + 3600*1000),
          sameSite: true,
        });
      }
      return data;
    }));
  }
}
