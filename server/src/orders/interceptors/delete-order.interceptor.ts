import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { OrdersService } from '../orders.service';
import { OrderStatus } from '../constants/order-status';
import { StripeService } from 'src/stripe/stripe.service';
import { ProductsService } from 'src/products/products.service';
import { UpdateCartItemDto } from 'src/carts/cart-items/dto/update-cart-item.dto';
import { UserRole } from 'src/users/constants/user-role';

/**
 * Realiza las verificaciones de autorización y operaciones asociadas a eliminación de órdenes.
 */
@Injectable()
export class DeleteOrderInterceptor implements NestInterceptor {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly stripeService: StripeService,
    private readonly productsService: ProductsService,
  ) {}

  /**
   * Implementación del metodo intercept del interceptor
   * @param context - Contexto de ejecución
   * @param next - Objeto para hacer el llamado al siguiente handler de la solicitud
   * @returns - Llamada al siguiente handler de la solicitud
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

    // Extrae el request de la solicitud
    const req = context.switchToHttp().getRequest();

    // Extrae el id del usuario
    const userId = req.user.sub;

    // Extrae el rol del usuario
    const role = req.user.role;

    // Obtiene el id de la orden del parámetro del url
    const orderId = req.params['id'];

    // Obtiene la orden a actualizar según el rol de usuario:
    const order = role === UserRole.ADMIN ? await this.ordersService.findOne(+orderId)
      : await this.ordersService.findOneForUser(+orderId, userId);

    // Si el estado de la orden es 'PAID' no se permite eliminar la orden
    if(order.status === OrderStatus.PAID) {
      throw new BadRequestException("The order can't be deleted before is finished");
    }

    // Si el estado de la orden es 'WAITING_PAYMENT' cancela el paymentIntent de Stripe asociado a la orden
    if(order.status === OrderStatus.WAITING_PAYMENT && order.paymentIntent) {
      await this.stripeService.cancelPaymentIntent(order.paymentIntent);
    }

    // Si el estado de la orden es 'STARTED' o 'WAITING_PAYMENT' revierte el inventario de los productos que estaban en la orden
    if(order.status === OrderStatus.STARTED || order.status === OrderStatus.WAITING_PAYMENT) {
      await this.productsService.rollbackInventory(
        order.items.map((item): UpdateCartItemDto => {
          return {productId: item.product.id, quantity: item.quantity};
        }
      ))
    }

    // LLamado al siguiente manejador de la solicitud
    return next.handle();
  }
}
