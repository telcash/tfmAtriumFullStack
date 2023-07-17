import { Controller, Get, UseGuards, Request, UseFilters, Res } from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Cart, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CartEntity } from './entities/cart.entity';
import { JwtRedirectFilter } from 'src/auth/filters/jwt-redirect.filter';


@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  /**
   * Endpoint para recibir todos los carritos
   * Para uso de un ADMIN
   * @returns 
   */
  @UseGuards(JwtAccessGuard)
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Cart[]> {
    const carts = await this.cartsService.findAll();
    return carts;
    //return carts.map((cart) => new CartEntity(cart));
  }

  /**
   * Endpoint para obtener el carro de compras de un usuario autenticado
   * Si el usuario no está autenticado redirige al endpoint para carrito de invitado
   * @param req 
   * @returns 
   */
  @UseGuards(JwtAccessGuard)
  @UseFilters(new JwtRedirectFilter('/carts/guest'))
  @Get('/mycart')
  async findCartByUserId(@Request() req): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.findCartByUserId(req.user.sub));
  }

  /**
   * Endpoint que busca el carro de compras de un invitado
   * @returns 
   */
  @Get('/guest')
  async findGuestCart(@Request() req, @Res({passthrough: true}) res) {
    return new CartEntity(await this.cartsService.findGuestCart(+req.signedCookies['cartId'], res));
  }
}
