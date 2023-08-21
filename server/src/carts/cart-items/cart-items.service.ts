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
   * Agrega si no existe, o actualiza un item a un carrito
   * Invoca el método upsert() de {@link CartItemsRepository}
   * @param {CreateCartItemDto} createCartItemDto - DTO
   * @returns - CartItem creado 
   */
  async upsert(createCartItemDto: CreateCartItemDto) {
    return await this.cartItemsRepository.upsert(createCartItemDto);
  }

  /**
   * Busca todos los items en un carrito
   * Invoca el método findAll() de {@link CartItemsRepository} para realizar la busqueda
   * @param {number} cartId - Id del carrito
   * @returns - Listado de items
   */
  async findAll(cartId: number) {
    return await this.cartItemsRepository.findAll(cartId);
  }

  /**
   * Busca un item en un carrito
   * Invoca el método findOne() de {@link CartItemsRepository} para realizar la busqueda
   * @param {number} productId - Id del producto 
   * @param {number} cartId - Id del carrito
   * @returns - Item buscado
   */
  async findOne(productId: number, cartId: number) {
    return await this.cartItemsRepository.findOne(productId, cartId);
  }

  /**
   * Actualiza un item de un carrito
   * Invoca el método update() de {@link CartItemsRepository} para hacer la actualización
   * @param {UpdateCartItemDto} updateCartItemDto - Dto para la actualización del item
   * @returns 
   */
  async update(updateCartItemDto: UpdateCartItemDto) {
    return await this.cartItemsRepository.update(updateCartItemDto);
  }

  /**
   * Elimina un item de un carrito
   * Invoca el método remove() de {@link CartItemsRepository} para eliminar el item
   * @param {UpdateCartItemDto} updateCartItemDto - Dto para la eliminación de un item
   * @returns 
   */
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

}
