import { Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { CartItemsService } from './cart-items/cart-items.service';
import { UpdateCartItemDto } from './cart-items/dto/update-cart-item.dto';

/**
 * Servicio que implementa las funciones de carritos
 */
@Injectable()
export class CartsService {

  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly cartItemsService: CartItemsService,
  ) {}

  /**
   * Gestiona la busqueda de todos los carritos existentes
   * Invoca al método findAll() de {@link CartsRepository} para buscar todos los carritos en la base de datos
   * @returns - Listado de carritos
   */
  async findAll() {
    return await this.cartsRepository.findAll();
  }

  /**
   * Crea un carrito con un id de usuario registrado correspondiente
   * Si no recibe el parámetro userId crea un carrito sin usuario registrado correspondiente (carrito para invitados)
   * Invoca al método create() de {@link CartsRepository} para crear el carrito en la base de datos
   * @param userId - Id del usuario
   * @returns - Carrito creado
   */
  async create(userId?: number) {
    return await this.cartsRepository.create(userId);
  }

  /**
   * Realiza la busqueda de un carrito por su id
   * Invoca al método findOneById() de {@link CartsRepository} para buscar el carrito en la base de datos
   * @param cartId - Id del carrito
   * @returns - Carrito buscado
   */
  async findOneById(cartId: number) {
    return await this.cartsRepository.findOneById(cartId);
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
   * Gestiona los items de un carrito de compras
   * Crea un nuevo item, actualiza la cantidad de un item existente, o elimina un item del carrito según corresponda
   * La correspondencia viene dada por la propiedad cantidad recibida en el DTO y la existencia previa o no del item en el carrito
   * Invoca al método create() de {@link CartsRepository} para crear el item si la cantidad es mayor que cero y el item no existe previamente en el carrito
   * Invoca al método update() de {@link CartsRepository} para actualizar el item si la cantidad es mayor que cero y el item existe previamente en el carrito
   * Invoca al método remove() de {@link CartsRepository} para eliminar el item si la cantidad es igual a cero y el item existe previamente en el carrito
   * @param userId - Id del usuario
   * @param createCartItemDto - DTO validado del item
   * @returns - Carrito de compras actualizado
   */
  async updateCartItems(updateCartItemDto: UpdateCartItemDto) {

    // Determina si el item ya existe en el carrito
    const cartItem = await this.cartItemsService.findOne(updateCartItemDto.productId, updateCartItemDto.cartId);

    // Si el item existe actualiza su cantidad o lo elimina según corresponda
    if(cartItem) {
      // Si la cantidad es cero elimina el item
      if (updateCartItemDto.quantity === 0) {
        await this.cartItemsService.remove(updateCartItemDto.productId, updateCartItemDto.cartId);
      } else {
        // Si la cantidad es mayor que cero actualiza el item en el carrito
        await this.cartItemsService.update(updateCartItemDto);
      }
    
    // Si el item no existe lo actualizamos
    // TODO; cambiar el DTO de UpdateCartItemDto donde todos las propiedaes son opcionales (crea conflicto con el método create() del repositorio)
    // Se cambia a CreateCartItemDto, o se crea un DTO único para todas las operaciones (CartItemDto)
    } else {
      if(updateCartItemDto.quantity > 0) {
        await this.cartItemsService.create({
          productId: updateCartItemDto.productId,
          cartId: updateCartItemDto.cartId,
          quantity: updateCartItemDto.quantity,
        })
      }
    }

    // Devuelve el carrito actualizado
    return await this.findOneById(updateCartItemDto.cartId);
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
    await this.cartItemsService.removeAllFromCart(cartId);
    // Devolvemos el carrito vacío
    return await this.findOneById(cartId);
  }

}
