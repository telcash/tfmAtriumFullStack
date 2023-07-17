import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemsRepository } from './cart-items.repository';
import { CartItem } from '@prisma/client';

@Injectable()
export class CartItemsService {
  constructor(private cartItemsRepository: CartItemsRepository) {}

  async create(createCartItemDto: CreateCartItemDto) {
    return await this.cartItemsRepository.create(createCartItemDto);
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  async findOne(productId: number, cartId: number): Promise<CartItem> {
    return await this.cartItemsRepository.findOne(productId, cartId);
  }

  async update(productId: number, cartId: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    return await this.cartItemsRepository.update(productId, cartId, updateCartItemDto);
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
