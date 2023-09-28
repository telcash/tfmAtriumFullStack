import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { CartsService } from '../carts.service';


/**
 * Asigna un carrito a un usuario registrado en sistema o a un invitado
 * Es necesario que un handler anterior haya asignado, de existir, la entidad user al request, p.e. {@link SetRequestUserInterceptor}
 * Determina si el usuario tiene un carrito asignado.
 * Busca en el request si existe la entidad user correspondiente a un usuario registrado
 * Si hay usuario registrado busca si este ya tiene un carrito asociado, si no lo tiene le asigna un nuevo carrito
 * Si el usuario es invitado chequea la cookie con la clave cartId para verificar si tiene un carrito asignado
 * Si el invitado no tiene carrito asignado, se le asigna uno nuevo y se envían la cookie de clave cartId con el valor del id del carrito
 * Anexa a request.user la entidad carrito asignada
 */
@Injectable()
export class SetRequestUserCartInterceptor implements NestInterceptor {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * Implementación del método intercept del interceptor.
   * Asigna un carrito al usuario que hace la petición, agrega el carrito a request.user
   * Si la petición la hace un usuario registrado, busca su carrito asociado, si no lo tiene le crea uno nuevo.
   * Si además el usuario registrado tiene un carrito de invitado, fusiona este carrito con su carrito de usuario.
   * Si la petición la hace un usuario invitado, busca su carrito asociado según el id de la cookie correspondiente, si no tiene, se le crea un carrito
   * Se anexa al request user.cart con el carrito correspondiente.
   * @param {ExecutionContext} context - Contexto de ejecución 
   * @param next - Objeto para hacer la llamada al siguiente handler de la solicitud
   * @returns - LLamada al siguiente handler de la solicitud
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

    // Extrae el request del context
    const req = context.switchToHttp().getRequest();

    // Extrae el response del context
    const res = context.switchToHttp().getResponse()

    // Verifica si hay usuario autenticado
    if(req.user) {
      
      // Busca el carrito del usuario
      let userCart = await this.cartsService.findOneByUserId(req.user.sub);

      // Si el usuario no tiene carrito se crea un carrito para el usuario
      if(!userCart) {
        userCart = await this.cartsService.create( {userId: req.user.sub, total: 0} );
      }
      
      // Verifica si hay un carrito de invitado chequeando la cookie correspondiente
      if(req.signedCookies && req.signedCookies['cartId']) {
        // Si hay un carrito de invitado lo fusiona con el carrito de usuario
        await this.cartsService.mergeCarts(userCart.id, +req.signedCookies['cartId']);
        
        // Luego de fusionar, elimina el carrito de invitado de la base de datos
        await this.cartsService.remove(+req.signedCookies['cartId'])

        // Expira la cookie del carrito de invitado
        res.cookie('cartId', req.signedCookies['cartId'], {
          expires: new Date(Date.now() -1 ),
          httpOnly: true,
          signed: true,
          sameSite: true,
        });
      }
      // Anexa al request el carrito de usuario
      req.user.cart = userCart;

    // No hay usuario autenticado
    } else {

      // Verifica si hay un carrito de invitado chequeando la cookie correspondiente
      if(req.signedCookies['cartId']) {

        // Si hay un carrito de invitado lo busca en la base de datos
        const guestCart = await this.cartsService.findOne(+req.signedCookies['cartId']);
        
        // Anexa al request el carrito de invitado
        req.user = { cart: guestCart }

      // No existe carrito de invitado
      } else {

        // Crea un nuevo carrito de invitado
        const guestCart = await this.cartsService.create( { total: 0 });
        
        // Anexa al response la cookie del carrito de invitado
        res.cookie('cartId', guestCart.id, {
          expires: new Date(Date.now() + 3600*1000),
          httpOnly: true,
          signed: true,
          sameSite: true,
        });

        // Anexa al request el carrito de invitado
        req.user = { cart: guestCart }
      }
    }

    // Llama al siguiente handler de la petición
    return next.handle();
  }
}
