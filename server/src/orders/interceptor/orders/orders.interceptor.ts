import { BadRequestException, CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { UpdateCartItemDto } from 'src/carts/cart-items/dto/update-cart-item.dto';
import { OrderStatus } from 'src/orders/constants/order-status';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { StripeService } from 'src/stripe/stripe.service';
import { UserRole } from 'src/users/constants/user-role';

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
    
    if(updateOrderDto.status === OrderStatus.STARTED || updateOrderDto.status === OrderStatus.PROCESSING_PAYMENT || updateOrderDto.status === OrderStatus.PAID) {
      throw new ForbiddenException('Update to this status value not allowed');

    } else if(updateOrderDto.status === OrderStatus.CANCELLED) {

    
      const order = await this.getOrder(req);
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
    } else if(updateOrderDto.status === OrderStatus.COMPLETED) {
      if(req.user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException('Only Admins can update order status as COMPLETED')
      }

      const order = await this.getOrder(req);
      if(order.status !== OrderStatus.PAID) {
        throw new BadRequestException('The order is not paid')
      }
      
    }

    return next.handle();
  }

  async getOrder(req) {
    const userId = req.user.sub;
    const orderId = req.params['id'];
    return await this.ordersService.findOneForUser(+orderId, userId);
  }
}
