import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';

//@UseGuards(JwtAccessGuard)
@Controller('carts/cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  /* @Post()
  async create(createCartItemDto: CreateCartItemDto) {

    return await this.cartItemsService.create(1, createCartItemDto);
  } */

  @Get()
  findAll() {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartItemsService.findOne(+id);
  }

  /* @Patch(':id')
  update(@Param('id')) {
    return this.cartItemsService.update(+id);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
