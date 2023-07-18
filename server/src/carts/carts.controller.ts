import { Controller, Get, UseGuards, Request, UseFilters, Res, Post, Body, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Cart, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CartEntity } from './entities/cart.entity';
import { JwtRedirectFilter } from 'src/auth/filters/jwt-redirect.filter';
import { CreateCartItemDto } from 'src/carts/cart-items/dto/create-cart-item.dto';
import { CartItemsService } from './cart-items/cart-items.service';


@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService, private readonly cartItemsService: CartItemsService) {}

  /**
   * Endpoint para recibir todos los carritos
   * Para uso de un ADMIN
   * @returns 
   */
  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<CartEntity[]> {
    const carts = await this.cartsService.findAll();
    return carts.map((cart) => new CartEntity(cart));
  }

  /**
   * Endpoint para obtener el carro de compras de un usuario autenticado
   * @param req - Request
   * @returns {CartEntity} - Carrito
   */
  @UseGuards(JwtAccessGuard)
  @Get('/mycart')
  async findCartByUserId(@Request() req): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.findCartByUserId(req.user.sub));
  }

  /**
   * Endpoint para obtener el carro de compras de un invitado
   * Obtiene el id del carrito de cookie
   * @returns {CartEntity} - Carrito
   */
  @Get('/guest')
  async findGuestCart(@Request() req, @Res({passthrough: true}) res): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.findGuestCart(+req.signedCookies['cartId'], res));
  }
  /**
   * Endpoint para agregar items al carrito de un usuario autenticado
   * @param req - Request
   * @param createCartItemDto - DTO
   * @returns {CartEntity} - Carrito actualizado
   */
  @UseGuards(JwtAccessGuard)
  @Post('/mycart/items')
  async addItemToCart(@Request() req, @Body() createCartItemDto: CreateCartItemDto): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.addItemToCart(req.user.sub, createCartItemDto));
  }
  
  
  @UseGuards(JwtAccessGuard)
  @Delete('/mycart/items')
  async emptyCart(@Request() req): Promise<CartEntity>{
    return new CartEntity(await this.cartsService.emptyCart(req.user.sub));
  }


}
