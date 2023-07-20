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
   * Busca todos los carritos
   * @returns - Listado de carritos
   */
  async findAll() {
    return await this.cartsRepository.findAll();
  }

  /**
   * Crea un carrito con un usuario asignado o sin usuario (para invitados)
   * @param userId - Id del usuario
   * @returns - Carrito creado
   */
  async create(userId?: number) {
    return await this.cartsRepository.create(userId);
  }

  /**
   * Busca un carrito por id
   * @param cartId - Id del carrito
   * @returns - Carrito buscado
   */
  async findOneById(cartId: number) {
    return await this.cartsRepository.findOneById(cartId);
  }

  /**
   * Busca un carrito por id de usuario
   * @param userId - Id del usuario
   * @returns - Carrito buscado
   */
  async findOneByUserId(userId: number) {
    return await this.cartsRepository.findOneByUserId(userId)
  }

  /**
   * Agrega un item al carrito de compras de un usuario autenticado
   * @param userId - Id del usuario
   * @param createCartItemDto - DTO del item
   * @returns - Carrito de compras actualizado
   */
  async updateCartItems(updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.cartItemsService.findOne(updateCartItemDto.productId, updateCartItemDto.cartId);
    if(cartItem) {
      if (updateCartItemDto.quantity === 0) {
        await this.cartItemsService.remove(updateCartItemDto.productId, updateCartItemDto.cartId);
      } else {
        await this.cartItemsService.update(updateCartItemDto);
      }
    } else {
      if(updateCartItemDto.quantity > 0) {
        await this.cartItemsService.create({
          productId: updateCartItemDto.productId,
          cartId: updateCartItemDto.cartId,
          quantity: updateCartItemDto.quantity,
        })
      }
    }
    return await this.findOneById(updateCartItemDto.cartId);
  }

  /**
   * Vacia el carrito de un usuario autenticado
   * @param userId - Id del usuario
   * @returns - Carrito vacío
   */
  /* async emptyCart(userId: number) {
    // Buscamos el carrito del usuario
    const cart = await this.findCartByUserId(userId);

    // Eliminamos todos los items en el carrito
    await this.cartItemsService.removeAllFromCart(cart.id);

    // Devolvemos el carrito vacío
    return await this.findCartByUserId(userId);
    
    //Otra opcion es borrar el carro y crear uno nuevo.Toma solo dos peticiones a la base de datos
  } */
  async emptyCart(id) {
    return 'Carrito vaciado'
  }

}
