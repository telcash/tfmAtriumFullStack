import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemsRepository } from './cart-items.repository';

/**
 * Servicio que implementa las funciones de CartItem (productos en carritos)
 */
@Injectable()
export class CartItemsService {

  constructor(private readonly cartItemsRepository: CartItemsRepository) {}

  /**
   * Agrega un producto a un carrito
   * @param {CreateCartItemDto} createCartItemDto - DTO
   * @returns - CartItem creado 
   */
  async create(createCartItemDto: CreateCartItemDto) {
    return await this.cartItemsRepository.create(createCartItemDto);
  }

  findAll() {
    return `This action returns all cartItems`;
  }

  /**
   * Realiza la busqueda de un CartItem según sus identificadores únicos: id de producto y id de carrito
   * Invoca el método findOne() de {@link CartItemsRepository} para buscar el carrito en la base de datos
   * @param {number} productId - Id del producto
   * @param {number} cartId - Id del carrito
   * @returns - CartItem buscado
   */
  async findOne(productId: number, cartId: number) {
    return await this.cartItemsRepository.findOne(productId, cartId);

  }

  /**
   * Actualiza un CartItem
   * Invoca el método update() de {@link CartItemsRepository} para actualizar un CartItem en la base de datos
   * @param {UpdateCartItemDto} updateCartItemDto - DTO 
   * @returns - CartItem actualizado
   */
  async update(updateCartItemDto: UpdateCartItemDto) {
    return await this.cartItemsRepository.update(updateCartItemDto);
  }

  /**
   * Elimina todos los CartItem de un carrito (Vacía el carrito)
   * Invoca el método removeAllFromCart() de {@link CartItemsRepository} para eliminar todos los CartItems correspondientes al carrito de la base de datos
   * @param {number} cartId - Id del carrito 
   * @returns - Cantidad de CartItems eliminados
   */
  async removeAllFromCart(cartId: number) {
    return await this.cartItemsRepository.removeAllFromCart(cartId);
  }

  /**
   * Elimina un CartItem
   * Invoca el método remove() de {@link CartItemsRepository} para eliminar un CartItem de la base de datos
   * @param productId - Id del producto
   * @param cartId - Id del carrito
   * @returns 
   */
  async remove(productId: number, cartId: number) {
    return await this.cartItemsRepository.remove(productId, cartId);
  }
}
