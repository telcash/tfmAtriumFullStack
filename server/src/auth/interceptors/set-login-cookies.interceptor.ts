import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Crea una cookie con el rol del usuario
 */
@Injectable()
export class SetLoginCookiesInterceptor implements NestInterceptor {

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

      // Extrae el request de la solicitud
      const req = context.switchToHttp().getRequest();

      // Extrae el rol del request
      const role = req.user.role;

      // Extrae el objeto response de la solicitud
      const res = context.switchToHttp().getResponse();
      
      // Agrega cookie con el valor del rol a la respuesta
      res.cookie('role', role, {
        expires: new Date(Date.now() + 3600 * 1000 ),
        sameSite: true,
      });

      // Retorna la respuesta
      return data;
    }));
  }
}
