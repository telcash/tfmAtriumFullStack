import { Controller, Get, UseGuards, Body, Delete, UseInterceptors, Patch } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CartEntity } from './entities/cart.entity';
import { UpdateCartItemPipe } from './pipes/update-cart-item.pipe';
import { UserRole } from 'src/users/constants/user-role';
import { SetRequestUserInterceptor } from 'src/auth/interceptors/set-req-user.interceptor';
import { User } from 'src/users/decorators/user.decorator';
import { SetRequestUserCartInterceptor } from './interceptors/set-request-user-cart.interceptor';
import { UpdateCartItemDto } from './cart-items/dto/update-cart-item.dto';
             
/**
 * Controlador del módulo {@link CartsModule}
 * Procesa las peticiones al endpoint 'carts'
 */
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * Endpoint para solicitud del listado de todos los carritos
   * Accesible sólo para usuarios Admin
   * @returns - Listado de carritos
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<CartEntity[]> {
    const carts = await this.cartsService.findAll();
    return carts.map((cart) => new CartEntity(cart));
  }

  /**
   * Endpoint para la solicitud de un carrito para un usuario
   * @param cart - Carrito asignado por {@link SetRequestUserCartInterceptor} 
   * @returns {CartEntity} - Carrito de compras
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor)
  @Get('/mycart')
  async findOne(@User('cart') cart): Promise<CartEntity> {
    return new CartEntity(cart);
  }

  /**
   * Endpoint para solicitud de agregar/actualizar/eliminar items del carrito
   * El valor de la propiedad quantity en el DTO será la cantidad establecida del item en el carrito
   * Desde 0 (eliminar item) hasta el máximo permitido.
   * Según la cantidad los servicios implementan la funcionalidad correspondiente
   * {@link SetRequestUserInterceptor} agrega la entidad user al request
   * {@link SetRequestUserCartInterceptor} determina el carrito correspondiente al usuario
   * @param updateCartItemDto - DTO con los datos del item validados con {@link UpdateCartItemPipe}
   * @returns {CartEntity} - Carrito actualizado
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor)
  @Patch('/mycart')
  async updateCartItems(@Body(UpdateCartItemPipe) updateCartItemDto: UpdateCartItemDto): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.updateCartItems(updateCartItemDto));
  }
  
  /**
   * Endpoint para solicitud de vaciado (eliminación de todos los items) de carrito de compras de un usuario
   * @param cart - Carrito asignado por {@link SetRequestUserCartInterceptor}
   * @returns - Carrito de compras vacío
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor)
  @Delete('/mycart')
  async emptyCart(@User('cart') cart): Promise<CartEntity>{
    return new CartEntity(await this.cartsService.emptyCart(+cart.id));
  }
}
