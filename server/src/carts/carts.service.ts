import { BadRequestException, Injectable } from '@nestjs/common';
import { CartsRepository } from './carts.repository';
import { CreateCartItemDto } from './cart-items/dto/create-cart-item.dto';
import { CartItemsService } from './cart-items/cart-items.service';
import { ProductsService } from 'src/products/products.service';

/**
 * Servicio que implementa las funciones de carritos
 */
@Injectable()
export class CartsService {

  constructor(
    private readonly cartsRepository: CartsRepository,
    private readonly cartItemsService: CartItemsService,
    private readonly productsService: ProductsService
  ) {}

  /**
   * Busca todos los carritos
   * @returns - Listado de carritos
   */
  async findAll() {
    return await this.cartsRepository.findAll();
  }

  /**
   * Busca el carrito de compras para un usuario autenticado
   * Crea el carrito del usuario si no existe
   * @param {number} userId - Id del usuario 
   * @returns - Carrito de compras
   */
  async findCartByUserId(userId: number) {
    // Busca el carrito para el usuario
    let cart = await this.cartsRepository.findOneByUserId(userId);
    
    // Si el usuario no tiene aún carrito creado se crea un carrito
    if (!cart) {
      cart = await this.cartsRepository.create(userId);
    }

    // Retorna el carrito
    return cart;
  }

  /**
   * Busca el carrito de compras para un invitado
   * @param {number} id - Id del carrito 
   * @param response - Response
   * @returns - Carrito de compras
   */
  async findGuestCart(id: number, response) {
    // Si existe id del carrito en cookies busca el carrito
    if(id) {
      return await this.cartsRepository.findOneById(id);
    }

    // Si no existe carrito se crea una nuevo sin usuario asignado (null)
    const cart = await this.cartsRepository.create(null);

    // Se envía en response cookie con el id del carrito asignado
    response.cookie('cartId', cart.id, {
      httpOnly: true,
      signed: true,
      sameSite: true,
    });

    // Retorna el carrito
    return cart;
  }

  /**
   * Agrega un item al carrito de compras de un usuario autenticado
   * @param userId - Id del usuario
   * @param createCartItemDto - DTO del item
   * @returns - Carrito de compras actualizado
   */
  async addItemToCart(userId: number, createCartItemDto: CreateCartItemDto) {
    const cart = await this.findCartByUserId(userId);
    let cartItem = await this.cartItemsService.findOne(createCartItemDto.productId, cart.id);
    if(!cartItem) {
      cartItem = await this.cartItemsService.create({
        ...createCartItemDto,
        cartId: cart.id,
      })
      return await this.findCartByUserId(userId);
    }

    const stock = (await this.productsService.findOne(createCartItemDto.productId)).stock;
    const quantity = cartItem.quantity + createCartItemDto.quantity
    if (quantity > stock) {
      throw new BadRequestException("Insufficient product stock");
    } 

    cartItem = await this.cartItemsService.update(createCartItemDto.productId, cart.id, { quantity: quantity});
    return await this.findCartByUserId(userId);
  }

  /**
   * Vacia el carrito de un usuario autenticado
   * @param userId - Id del usuario
   * @returns - Carrito vacío
   */
  async emptyCart(userId: number) {
    // Buscamos el carrito del usuario
    const cart = await this.findCartByUserId(userId);

    // Eliminamos todos los items en el carrito
    await this.cartItemsService.removeAllFromCart(cart.id);

    // Devolvemos el carrito vacío
    return await this.findCartByUserId(userId);
    
    //Otra opcion es borrar el carro y crear uno nuevo.Toma solo dos peticiones a la base de datos
  }

}
