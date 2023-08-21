import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
import { CartsService } from '../carts.service';

/**
 * Actualiza el monto total en un carrito
 */
@Injectable()
export class UpdateTotalInterceptor implements NestInterceptor {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * Implementación del método intercept del interceptor
   * @param context - Contexto de ejecución
   * @param next - Objeto para hacer el llamado al siguiente handler de la solicitud
   * @returns - Llamada al siguiente handler de la solicitud
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

    //Llamada al siguiente manejador de la solictud
    return next.handle().pipe(map(async (data) => {

      // LLama al método updateTotal() de CartsService para actualizar el total
      await this.cartsService.updateTotal(data.cartId);

      // Retorna
      return data;
    }));
  }
}
