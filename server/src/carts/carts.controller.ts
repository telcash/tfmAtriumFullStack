import { Controller, Get, Param, Delete, UseInterceptors, UseGuards, Post, Body, Patch } from '@nestjs/common';
import { CartsService } from './carts.service';
import { SetRequestUserInterceptor } from 'src/auth/interceptors/set-req-user.interceptor';
import { SetRequestUserCartInterceptor } from './interceptors/set-request-user-cart.interceptor';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/constants/user-role';
import { CartEntity } from './entities/cart.entity';
import { User } from 'src/users/decorators/user.decorator';
import { CheckoutPipe } from './pipes/checkout.pipe';
import { CheckoutCartDto } from './dto/checkout-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

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
  async findMyCart(@User('cart') cart): Promise<CartEntity> {
    return new CartEntity(cart);
  }

  /**
   * Endpoint pra la solicitud de actualización de un carrito para un usuario
   * @param cart - Carrito asignado por {@link SetRequestUserCartInterceptor}
   * @param {UpdateCartDto} updateCartDto - Dto con los datos de actualización
   * @returns - Carrito de compras
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor)
  @Patch('/mycart')
  async updateMyCart(@User('cart') cart, @Body() updateCartDto: UpdateCartDto): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.updateMyCart(cart.id, updateCartDto))
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

  /**
   * Endpoint para solicitud de checkout de un carrito
   * @param {CheckoutCartDto} checkoutCartDto - Dto con los datos para el checkout
   * @returns {number} - Id de la orden creada
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor)
  @Post('/mycart/checkout')
  async checkout(@Body(CheckoutPipe) checkoutCartDto: CheckoutCartDto): Promise<number> {
    return await this.cartsService.checkout(checkoutCartDto);
  }
  
  /**
   * Endpoint para solicitar un carrito por su id
   * Accesible solo para usuarios Admin
   * @param id - Id del carrito
   * @returns - Carrito buscado
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }
}
