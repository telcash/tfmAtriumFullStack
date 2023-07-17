import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepository } from './carts.repository';
import { Cart } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private cartsRepository: CartsRepository) {}

  async createWithUserId(userId?: number): Promise<Cart> {
    return await this.cartsRepository.create(userId);
  }

  async findAll(): Promise<Cart[]> {
    return await this.cartsRepository.findAll();
  }

  /**
   * Busca el carrito de compras para un usuario autenticado
   * Crea el carrito del usuario si no existe
   * @param {number} userId - Id del usuario 
   * @returns {Cart} - Carrito de compras
   */
  async findCartByUserId(userId: number): Promise<Cart> {
    let cart = await this.cartsRepository.findOneByUserId(userId);
    if (!cart) {
      cart = await this.cartsRepository.create(userId);
    }
    return cart;
  }

  async findGuestCart(id: number, response) {
    if(id) {
      return await this.cartsRepository.findOneById(id);
    }
    const cart = await this.cartsRepository.create(null);
    response.cookie('cartId', cart.id, {
      httpOnly: true,
      signed: true,
      sameSite: true,
    });
    return cart;
  }

  async update(userId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    return await this.cartsRepository.update(userId, updateCartDto);
  }

  async remove(id: number): Promise<Cart> {
    return await this.cartsRepository.remove(id);
  }
}
