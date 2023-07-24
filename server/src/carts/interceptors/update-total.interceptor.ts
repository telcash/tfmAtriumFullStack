import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import { CartsService } from '../carts.service';

@Injectable()
export class UpdateTotalInterceptor implements NestInterceptor {
  constructor(private readonly cartsService: CartsService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    return next.handle().pipe(map(async (data) => {
        await this.cartsService.updateTotal(data.cartId);
        return data;
      }
    ));
  }
}
