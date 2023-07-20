import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { CartsService } from '../carts.service';

/**
 * Asigna un carrito a un usuario
 */
@Injectable()
export class SetRequestUserCartInterceptor implements NestInterceptor {
  constructor(private readonly cartsService: CartsService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

    // Extrae el request
    const req = context.switchToHttp().getRequest();
    
    // Si en el request hay un usuario buscamos su carrito correspondiente
    if(req.user) {
      let cart = await this.cartsService.findOneByUserId(req.user.sub)
      
      // Si el usuario aún no tiene carrito se le crea uno 
      if(!cart) {
        cart = await this.cartsService.create(req.user.sub)
      }
      
      // Anexamos el carrito al request
      req.user.cart = cart;

      // Pasamos la petición al siguiente handler
      return next.handle();
    }

    // Si en el request no hay usuario verificamos si hay un carrito previamente asignado a un invitado
    if (req.signedCookies['cartId']) {
      // Buscamos el carrito asignado
      const cart = await this.cartsService.findOneById(+req.signedCookies['cartId']);
      
      // Anexamos user al request con la propiedad cartId
      req.user = {
        cart: cart,
      }

      // Pasamos la petición al siguiente handler
      return next.handle();
    }
    
    // Si el invitado no tiene aún carrito le creamos uno
    // Anexamos user al request con la propiedad cartId
    const cart = await this.cartsService.create();
    req.user = {
      cart: cart,
    };

    // Extraemos la response de context y le agregamos una cookie con el id del carrito del invitado
    const res = context.switchToHttp().getResponse();

    res.cookie('cartId', cart.id, {
      httpOnly: true,
      signed: true,
      sameSite: true,
    });

    // Pasamos la petición al siguiente handler
    return next.handle();
  }
}
