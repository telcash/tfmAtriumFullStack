import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemsRepository } from './cart-items.repository';
import { CartItem, Prisma } from '@prisma/client';

/**
 * Servicio que implementa las funciones de CartItem
 */
@Injectable()
export class CartItemsService {

  constructor(private readonly cartItemsRepository: CartItemsRepository) {}

  /**
   * Crea un CartItem
   * @param {CreateCartItemDto} createCartItemDto - DTO
   * @returns {CartItem} - CartItem creado 
   */
  async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return await this.cartItemsRepository.create(createCartItemDto);
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  /**
   * Busca un CartItem
   * @param {number} productId 
   * @param {number} cartId 
   * @returns {CartItem} - CartItem buscado
   */
  async findOne(productId: number, cartId: number): Promise<CartItem> {
    return await this.cartItemsRepository.findOne(productId, cartId);
  }

  /**
   * Actualiza un CartItem
   * @param {number} productId - Id de producto 
   * @param {number} cartId - Id de carrito 
   * @param {UpdateCartItemDto} updateCartItemDto - DTO 
   * @returns {CartItem} - CartItem actualizado
   */
  async update(productId: number, cartId: number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
    return await this.cartItemsRepository.update(productId, cartId, updateCartItemDto);
  }

  /**
   * Elimina todos los CartItem de un carrito (Vacía el carrito)
   * @param {number} cartId - Id del carrito 
   * @returns {Prisma.BatchPayload} - Objeto con propiedad count de valor igual a los CartItems eliminados
   */
  async removeAllFromCart(cartId: number): Promise<Prisma.BatchPayload> {
    return await this.cartItemsRepository.removeAllFromCart(cartId);
  }

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
