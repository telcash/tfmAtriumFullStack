import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepository } from './carts.repository';
import { Cart } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private cartsRepository: CartsRepository) {}

  async create(userId?: number): Promise<Cart> {
    return await this.cartsRepository.create(userId);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartsRepository.findAll();
  }

  async findOne(userId: number): Promise<Cart> {
    return await this.cartsRepository.findOne(userId)
  }

  async update(userId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    return await this.cartsRepository.update(userId, updateCartDto);
  }

  async remove(userId: number): Promise<Cart> {
    return await this.cartsRepository.remove(userId);
  }
}
