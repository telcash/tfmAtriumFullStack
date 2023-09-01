import { BadRequestException, CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { UpdateCartItemDto } from 'src/carts/cart-items/dto/update-cart-item.dto';
import { OrderStatus } from 'src/orders/constants/order-status';
import { UpdateOrderDto } from 'src/orders/dto/update-order.dto';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';
import { StripeService } from 'src/stripe/stripe.service';
import { UserRole } from 'src/users/constants/user-role';

/**
 * Realiza las verificaciones de autorización y operaciones asociadas a actualización de órdenes.
 */
@Injectable()
export class UpdateOrderInterceptor implements NestInterceptor {

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

    // Extrae el dto con los datos de actualización
    const updateOrderDto: UpdateOrderDto = req.body;

    // Extrae el id del usuario
    const userId = req.user.sub;

    // Extrae el rol del usuario
    const role = req.user.role;

    // Obtiene el id de la orden del parámetro del url
    const orderId = req.params['id'];

    // Obtiene la orden a actualizar según el rol de usuario:
    const order = role === UserRole.ADMIN ? await this.ordersService.findOne(+orderId)
      : await this.ordersService.findOneForUser(+orderId, userId);
    
    // Operaciones a realizar si la actualización de la orden es a un status 'CANCELLED'
    if(updateOrderDto.status === OrderStatus.CANCELLED) {
    
      // Ejecuta las operaciones solo si el status anterior de la orden es 'STARTED' o 'WAITING_PAYMENT'
      if (order.status === OrderStatus.STARTED || order.status === OrderStatus.WAITING_PAYMENT) {
        
        // Cancela el paymentIntent de Stripe asociado a la orden
        if(order.paymentIntent) {
          await this.stripeService.cancelPaymentIntent(order.paymentIntent);
        }

        // Revierte al inventario los productos que estaban en la orden.
        await this.productsService.rollbackInventory(
          order.items.map((item): UpdateCartItemDto => {
            return {productId: item.product.id, quantity: item.quantity};
          }
        ))

      }

    // Operaciones a realizar si la actualización de la orden es a un status 'COMPLETED'
    } else if(updateOrderDto.status === OrderStatus.COMPLETED) {

      // La actualización se ejecuta sólo si la solicitud viene de parte de un Administrador
      if(req.user.role !== UserRole.ADMIN) {
        throw new UnauthorizedException('Only Admins can update order status as COMPLETED')
      }

      // La actualización sólo se ejecuta si el sistema ha actualizado anteriormente la orden a un status 'PAID'
      if(order.status !== OrderStatus.PAID) {
        throw new BadRequestException('The order is not paid')
      }
      
    }

    // LLamado al siguiente manejador de la solicitud
    return next.handle();
  }

}
