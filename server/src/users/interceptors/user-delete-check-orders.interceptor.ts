import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '../constants/user-role';
import { OrdersService } from 'src/orders/orders.service';
import { OrderStatus } from 'src/orders/constants/order-status';
import { ProductsService } from 'src/products/products.service';
import { UpdateCartItemDto } from 'src/carts/cart-items/dto/update-cart-item.dto';
import { StripeService } from 'src/stripe/stripe.service';

/**
 * Chequea el listado de órdenes de un usuario cuya cuenta se desea eliminar.
 * Si encuentra alguna orden con un status 'PAID' genera un BadRequestException.
 * Si encuentra alguna orden con un status 'WAITING_PAYMENT' cancela los paymentIntent de Stripe de estás órdenes.
 * Si encuentra alguna orden con un status 'STARTED' o 'WAITING_PAYMENT' revierte al inventario las cantidades de los productos en esas órdenes.
 */
@Injectable()
export class UserDeleteCheckOrdersInterceptor implements NestInterceptor {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly stripeService: StripeService,
  ) {}

  /**
   * Implementación del metodo intercept del interceptor
   * @param context - Contexto de ejecución
   * @param next - Objeto para hacer el llamado al siguiente handler de la solicitud
   * @returns - Llamada al siguiente handler de la solicitud
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    let userId: number;
    
    // Obtiene el request del context
    const req = context.switchToHttp().getRequest();

    //Chequea si el url de la petición es '/users/profile'
    if(req.url === '/users/profile') {

      // Si es así el usuario a eliminar la cuenta es quien hace la petición
      userId = req.user.sub
    } else {

      // Si no es así, el id del usuario está en los parámetros del url
      userId = +req.params['id'];
    }

    
    // Obtiene un listado de las órdenes de la cuenta que se desea eliminar
    const orders = await this.ordersService.findAllForUser(userId);
    
    // Verifica si el usuario tiene alguna orden pagada pendiente de finalizar
    if(orders.filter(order => order.status === OrderStatus.PAID).length > 0) {

      // Si hay alguna orden con estás características devuelve un error
      throw new BadRequestException("Can't delete user because has pending orders");
    }

    // Verifica si el usuario tiene alguna orden con un status WAITING_PAYMENT
    const waitingPaymentOrders = orders.filter(order => order.status === OrderStatus.WAITING_PAYMENT)
    if(waitingPaymentOrders.length >0) {

      // Si hay alguna orden con este estado se cancelan los paymentIntent de Stripe de estás órdenes
      waitingPaymentOrders.forEach(async order => await this.stripeService.cancelPaymentIntent(order.paymentIntent))

      // Revertimos el inventario de las ordenes
      await this.rollbackInventory(waitingPaymentOrders)
    }

    // Verifica si el usuario tiene alguna orden con un status STARTED
    const startedOrders = orders.filter(order => order.status === OrderStatus.STARTED)
    if(startedOrders.length > 0) {

      // Si hay órdenes con este status revertimos el inventario de estás órdenes
      await this.rollbackInventory(startedOrders)
    }
    
    return next.handle();
  }

  /**
   * Método que revierte el inventario de los productos de un listado de órdenes
   * @param orders - Listado de órdenes
   */
  async rollbackInventory(orders) {
    orders.forEach(async order => {
      await this.productsService.rollbackInventory(
        order.items.map((item): UpdateCartItemDto => {
          return {productId: item.product.id, quantity: item.quantity};
        }
      ))
    })
  }
}
