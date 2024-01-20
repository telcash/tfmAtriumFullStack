import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { StripeService } from 'src/stripe/stripe.service';
import { ProductsService } from 'src/products/products.service';
export declare class DeleteOrderInterceptor implements NestInterceptor {
    private readonly ordersService;
    private readonly stripeService;
    private readonly productsService;
    constructor(ordersService: OrdersService, stripeService: StripeService, productsService: ProductsService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<any>;
}
