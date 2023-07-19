import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemsRepository } from './cart-items.repository';
import { CartItem, Prisma } from '@prisma/client';
import { CartItemEntity } from './entities/cart-item.entity';

/**
 * Servicio que implementa las funciones de CartItem
 */
@Injectable()
export class CartItemsService {

  constructor(private readonly cartItemsRepository: CartItemsRepository) {}

  /**
   * Crea un CartItem
   * @param {CreateCartItemDto} createCartItemDto - DTO
   * @returns {CartItemEntity} - CartItem creado 
   */
  async create(createCartItemDto: CreateCartItemDto): Promise<CartItemEntity> {
    return new CartItemEntity(await this.cartItemsRepository.create(createCartItemDto));
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  /**
   * Busca un CartItem
   * @param {number} productId 
   * @param {number} cartId 
   * @returns {CartItemEntity} - CartItem buscado
   */
  async findOne(productId: number, cartId: number): Promise<CartItemEntity> {
    return new CartItemEntity(await this.cartItemsRepository.findOne(productId, cartId));
  }

  /**
   * Actualiza un CartItem
   * @param {number} productId - Id de producto 
   * @param {number} cartId - Id de carrito 
   * @param {UpdateCartItemDto} updateCartItemDto - DTO 
   * @returns {CartItemEntity} - CartItem actualizado
   */
  async update(productId: number, cartId: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItemEntity> {
    return new CartItemEntity(await this.cartItemsRepository.update(productId, cartId, updateCartItemDto));
  }

  /**
   * Elimina todos los CartItem de un carrito (Vacía el carrito)
   * @param {number} cartId - Id del carrito 
   * @returns {number} - Cantidad de CartItems eliminados
   */
  async removeAllFromCart(cartId: number): Promise<number> {
    return await this.cartItemsRepository.removeAllFromCart(cartId);
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
