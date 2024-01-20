import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { CartsService } from '../carts.service';
export declare class SetRequestUserCartInterceptor implements NestInterceptor {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<any>;
}
