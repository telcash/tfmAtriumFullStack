import { Controller, Get, UseGuards, Request, Res, Post, Body, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CartEntity } from './entities/cart.entity';
import { CreateCartItemDto } from 'src/carts/cart-items/dto/create-cart-item.dto';
import { AddItemToCartPipe } from './pipes/add-item-to-cart.pipe';
import { UserRole } from 'src/users/constants/user-role';
             

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
   * Endpoint para obtener el carro de compras de un usuario autenticado
   * @param req - Request
   * @returns - Carrito
   */
  @UseGuards(JwtAccessGuard)
  @Get('/mycart')
  async findCartByUserId(@Request() req): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.findCartByUserId(req.user.sub));
  }

  /**
   * Endpoint para obtener el carro de compras de un invitado
   * Obtiene el id del carrito de cookie
   * @returns - Carrito
   */
  @Get('/guest')
  async findGuestCart(@Request() req, @Res({passthrough: true}) res) {
    return new CartEntity(await this.cartsService.findGuestCart(+req.signedCookies['cartId'], res));
  }

  /**
   * Endpoint para agregar/actualizar items al carrito de un usuario autenticado
   * El DTO contiene la nueva cantida que se desea tener del item:
   * Desde 0 (eliminar item) hasta el máximo permitido.
   * @param req - Request
   * @param createCartItemDto - DTO
   * @returns - Carrito actualizado
   */
  @UseGuards(JwtAccessGuard)
  @Post('/mycart/items')
  async addItemToCart(@Request() req, @Body(AddItemToCartPipe) createCartItemDto: CreateCartItemDto): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.addItemToCart(req.user.sub, createCartItemDto));
  }
  
  /**
   * Endpoint para vaciar el carrito de compras de un usuario autenticado
   * @param req - Request
   * @returns - Carrito de compras vacío
   */
  @UseGuards(JwtAccessGuard)
  @Delete('/mycart/items')
  async emptyCart(@Request() req): Promise<CartEntity>{
    return new CartEntity(await this.cartsService.emptyCart(req.user.sub));
  }
}
