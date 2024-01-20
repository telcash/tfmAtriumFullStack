import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { StripeService } from 'src/stripe/stripe.service';
export declare class UserDeleteCheckOrdersInterceptor implements NestInterceptor {
    private readonly ordersService;
    private readonly productsService;
    private readonly stripeService;
    constructor(ordersService: OrdersService, productsService: ProductsService, stripeService: StripeService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    rollbackInventory(orders: any): Promise<void>;
}
