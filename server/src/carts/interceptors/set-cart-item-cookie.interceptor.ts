import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Observable, map } from 'rxjs';

/**
 * Crea o elimina cookies de los items en el carrito de un usuario
 */
@Injectable()
export class SetCartItemCookieInterceptor implements NestInterceptor {

  /**
   * Implementación del método intercept del interceptor
   * @param context - Contexto de ejecución
   * @param next - Objeto para hacer el llamado al siguiente handler de la solicitud
   * @returns - Llamada al siguiente handler de la solicitud
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    //Llamada al siguiente manejador de la solictud
    return next.handle().pipe(map((data) => {
      
      // Instrucciones luego de ejecutarse el manejador de la solictud

      // Extrae el request y el response de la solicitud
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
      
      // Si el request es para eliminar un item, elimina la cookie del item
      if(req.method === 'DELETE') {
        res.cookie(`pId_${data.productId}`, data.quantity, {
          expires: new Date(Date.now() - 1),
          sameSite: true,
        });
        return data;
      }

      // Si el requests es un array de items para crearse, crea una cookie para cada item del array
      if(isArray(data)) {
        for(const item of data) {
          res.cookie(`pId_${item.productId}`, item.quantity, {
            expires: new Date(Date.now() + 3600*1000),
            sameSite: true,
          });
        }
      } else {

        // Si el request es un item para crearse, crea una cookie para el item
        res.cookie(`pId_${data.productId}`, data.quantity, {
          expires: new Date(Date.now() + 3600*1000),
          sameSite: true,
        });
      }

      // Retorna la respuesta
      return data;
    }));
  }
}
