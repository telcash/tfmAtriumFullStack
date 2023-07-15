import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { CartEntity } from './entities/cart.entity';

@UseGuards(JwtAccessGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(@Request() req, @Body() createCartDto: CreateCartDto): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.create(req.user.sub, createCartDto));
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<CartEntity[]> {
    const carts = await this.cartsService.findAll();
    return carts.map((cart) => new CartEntity(cart));
  }

  @Get('/mycart')
  async findOne(@Request() req): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.findOne(req.user.sub));
  }

  @Patch('/mycart')
  async update(@Request() req, @Body() updateCartDto: UpdateCartDto): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.update(req.user.sub, updateCartDto));
  }

  @Delete('/mycart')
  async remove(@Request() req): Promise<CartEntity> {
    return new CartEntity(await this.cartsService.remove(req.user.sub));
  }
}
