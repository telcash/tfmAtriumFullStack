import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { UpdateCartItemDto } from 'src/carts/cart-items/dto/update-cart-item.dto';
import { OrderStatus } from 'src/orders/constants/order-status';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class OrdersInterceptor implements NestInterceptor {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly stripeService: StripeService,
    private readonly productsService: ProductsService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

    const req = context.switchToHttp().getRequest();
    const updateOrderDto: UpdateOrderDto = req.body;
    
    
    if(req.method === 'PATCH' && (updateOrderDto.status === OrderStatus.CANCELLED) ) {
      const userId = req.user.sub;
      const orderId = req.params['id'];
      const order = await this.ordersService.findOneForUser(+orderId, userId);
      if (order.status === OrderStatus.STARTED || order.status === OrderStatus.PROCESSING_PAYMENT) {
        
        //cancelar el paymentIntent
        if(order.paymentIntent) {
          await this.stripeService.cancelPaymentIntent(order.paymentIntent);
        }

        // revertir el inventario
        const items: UpdateCartItemDto[] = [];
        for(const item of order.items) {
          items.push({productId: item.product.id, quantity: item.quantity});
        }
        this.productsService.rollbackCartCheckout(items);

      }
    }

    return next.handle();
  }
}
