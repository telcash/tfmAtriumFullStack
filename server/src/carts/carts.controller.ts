import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';

@UseGuards(JwtAccessGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  async create(@Request() req, @Body() createCartDto: CreateCartDto) {
    return await this.cartsService.create(req.user.sub, createCartDto);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.cartsService.findAll();
  }

  @Get('/mycart')
  async findOne(@Request() req) {
    return await this.cartsService.findOne(req.user.sub);
  }

  @Patch('/mycart')
  async update(@Request() req, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartsService.update(req.user.sub, updateCartDto);
  }

  @Delete('/mycart')
  async remove(@Request() req) {
    return await this.cartsService.remove(req.user.sub);
  }
}
