import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Request, UseFilters, Redirect } from '@nestjs/common';
import { CartsService } from './carts.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CartEntity } from './entities/cart.entity';
import { CreateCartItemDto } from '../cart-items/dto/create-cart-item.dto';
import { JwtRedirectFilter } from 'src/auth/filters/jwt-redirect.filter';


@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(JwtAccessGuard)
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<CartEntity[]> {
    const carts = await this.cartsService.findAll();
    return carts.map((cart) => new CartEntity(cart));
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

  @Get('/guest')
  async findGuestCart() {
    return 'Guest cart'
  }

  /* @Patch('/mycart')
  async update(@Request() req, @Body() updateCartDto: UpdateCartDto): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.update(req.user.sub, updateCartDto));
  } */

  /* @Delete('/mycart')
  async remove(@Request() req): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.remove(req.user.sub));
  } */
}
