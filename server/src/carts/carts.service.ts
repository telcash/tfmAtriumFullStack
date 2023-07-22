import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartsRepository } from './carts.repository';
import { CartItemsService } from './cart-items/cart-items.service';

@Injectable()
export class CartsService {
  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly cartItemsService: CartItemsService,
  ) {}

  /**
   * Crea un carrito con un id de usuario registrado correspondiente
   * Si el Dto no contiene un valor de userId crea un carrito sin usuario registrado correspondiente (carrito para invitados)
   * Invoca al método create() de {@link CartsRepository} para crear el carrito en la base de datos
   * @param {CreateCartDto} createCartDto - Id del usuario
   * @returns - Carrito creado
   */
  async create(createCartDto: CreateCartDto) {
    return await this.cartsRepository.create(createCartDto);
  }

  /**
   * Gestiona la busqueda de todos los carritos existentes
   * Invoca al método findAll() de {@link CartsRepository} para buscar todos los carritos en la base de datos
   * @returns - Listado de carritos
   */
  async findAll() {
    return await this.cartsRepository.findAll();
  }

  /**
   * Realiza la busqueda de un carrito por su id
   * Invoca al método findOneById() de {@link CartsRepository} para buscar el carrito en la base de datos
   * @param cartId - Id del carrito
   * @returns - Carrito buscado
   */
  async findOne(id: number) {
    return await this.cartsRepository.findOne(id);
  }

  /**
   * Realiza la busqueda de un carrito asociado a un id de usuario registrado
   * Invoca al método findOneByUserId() de {@link CartsRepository} para realizar la busqueda en la base de datos
   * @param userId - Id del usuario
   * @returns - Carrito buscado
   */
  async findOneByUserId(userId: number) {
    return await this.cartsRepository.findOneByUserId(userId)
  }

  /**
     * Vacia el carrito de un usuario
     * Elmina todos los items que estén el carrito
     * Invoca al método removeAllFromCart() de {@link CartsRepository} para eliminar todos los items del carrito en la base de datos
     * @param {number} cartId - Id del carrito a vaciar
     * @returns - Carrito vacío
     */
  async emptyCart(cartId: number) {
    // Eliminamos todos los items en el carrito
    await this.cartItemsService.removeAll(cartId);
    // Devolvemos el carrito vacío
    return await this.findOne(cartId);
  }
}

