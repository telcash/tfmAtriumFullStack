import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemsRepository } from './cart-items.repository';

@Injectable()
export class CartItemsService {
  constructor(
    private readonly cartItemsRepository: CartItemsRepository,
  ) {}

  /**
   * Agrega un item a un carrito
   * @param {CreateCartItemDto} createCartItemDto - DTO
   * @returns - CartItem creado 
   */
  async upsert(createCartItemDto: CreateCartItemDto) {
    return await this.cartItemsRepository.upsert(createCartItemDto);
  }

  async findAll(cartId: number) {
    return await this.cartItemsRepository.findAll(cartId);
  }

  /**
   * Actualiza un item de un carrito
   * @param updateCartItemDto 
   * @returns 
   */
  async update(updateCartItemDto: UpdateCartItemDto) {
    return await this.cartItemsRepository.update(updateCartItemDto);
  }

  async remove(updateCartItemDto: UpdateCartItemDto) {
    return await this.cartItemsRepository.remove(updateCartItemDto.productId, updateCartItemDto.cartId);
  }

  /**
   * Elimina todos los CartItem de un carrito (Vacía el carrito)
   * Invoca el método removeAllFromCart() de {@link CartItemsRepository} para eliminar todos los CartItems correspondientes al carrito de la base de datos
   * @param {number} cartId - Id del carrito 
   * @returns - Cantidad de CartItems eliminados
   */
  async removeAll(cartId: number) {
    return await this.cartItemsRepository.removeAll(cartId);
  }

  async findOne(productId: number, cartId: number) {
    return await this.cartItemsRepository.findOne(productId, cartId);
  }
}
