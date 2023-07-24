import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { CartsService } from '../carts.service';
import { CreateCartDto } from '../dto/create-cart.dto';

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
   * @param {ExecutionContext} context - Contexto de ejecución 
   * @param next - Objeto para hacer la llamada al siguiente handler de la solicitud
   * @returns - LLamada al siguiente handler de la solicitud
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

    // Inicializamos el Dto de creacion de carrito con un total de cero
    const createCartDto: CreateCartDto = { total: 0}
;

    // Extrae el request del contexto
    const req = context.switchToHttp().getRequest();
    
    // Si en el request hay un usuario buscamos su carrito correspondiente
    if(req.user) {
      let cart = await this.cartsService.findOneByUserId(req.user.sub)
      
      // Si el usuario aún no tiene carrito se le crea uno 
      if(!cart) {
        cart = await this.cartsService.create({
          ...createCartDto,
          userId: req.user.sub,
        })
      }
      
      // Anexamos el carrito al request
      req.user.cart = cart;

      // Pasamos la petición al siguiente handler
      return next.handle();
    }

    // Si en el request no hay usuario verificamos si hay un carrito previamente asignado a un invitado
    if (req.signedCookies['cartId']) {
      // Buscamos el carrito asignado
      const cart = await this.cartsService.findOne(+req.signedCookies['cartId']);
      
      // Anexamos user al request con la propiedad cartId
      req.user = {
        cart: cart,
      }

      // Pasamos la petición al siguiente handler
      return next.handle();
    }
    
    // Si el invitado no tiene aún carrito le creamos uno
    // Anexamos user al request con la propiedad cartId
    const cart = await this.cartsService.create(createCartDto);
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
