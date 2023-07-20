import { Controller, Get, UseGuards, Request, Res, Post, Body, Delete, UseInterceptors } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CartEntity } from './entities/cart.entity';
import { CreateCartItemDto } from 'src/carts/cart-items/dto/create-cart-item.dto';
import { UpdateCartItemPipe } from './pipes/update-cart-item.pipe';
import { UserRole } from 'src/users/constants/user-role';
import { SetRequestUserInterceptor } from 'src/auth/interceptors/set-req-user.interceptor';
import { User } from 'src/users/decorators/user.decorator';
import { SetRequestUserCartInterceptor } from './interceptors/set-request-user-cart.interceptor';
             

@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService) {}

  /**
   * Endpoint para recibir todos los carritos
   * Para uso de un ADMIN
   * @returns 
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<CartEntity[]> {
    const carts = await this.cartsService.findAll();
    return carts.map((cart) => new CartEntity(cart));
  }

  /**
   * Endpoint para obtener un carrito para usuarios autenticados e invitados
   * @param cart - Carrito asignado por SetRequestUserCartInterceptor 
   * @returns {CartEntity} - Carrito de compras
   */
  @UseInterceptors(SetRequestUserInterceptor, SetRequestUserCartInterceptor)
  @Get('/mycart')
  async findOne(@User('cart') cart): Promise<CartEntity> {
    return new CartEntity(cart);
  }

  /**
   * Endpoint para agregar/actualizar items a un carrito
   * El DTO contiene la nueva cantida que se desea tener del item:
   * Desde 0 (eliminar item) hasta el máximo permitido.
   * @param req - Request
   * @param createCartItemDto - DTO
   * @returns - Carrito actualizado
   */
  @UseInterceptors(SetRequestUserInterceptor)
  @Post('/mycart')
  async addItemToCart(@Body(UpdateCartItemPipe) createCartItemDto: CreateCartItemDto): Promise<CartEntity> {
    //return new CartEntity(await this.cartsService.addItemToCart(req.user.sub, createCartItemDto));
    return new CartEntity({id: 1}); // temporal para quitar errores de compilacion
  }
  
  /**
   * Endpoint para vaciar el carrito de compras de un usuario autenticado
   * @param req - Request
   * @returns - Carrito de compras vacío
   */
  @UseGuards(JwtAccessGuard)
  @Delete('/mycart')
  async emptyCart(@Request() req): Promise<CartEntity>{
    //return new CartEntity(await this.cartsService.emptyCart(req.user.sub));
    return new CartEntity({id: 1}); // temporal para quitar errores de compilacion
  }
}
