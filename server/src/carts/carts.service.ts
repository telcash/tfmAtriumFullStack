import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartsRepository } from './carts.repository';
import { Cart } from '@prisma/client';
import { CreateCartDto } from './dto/create-cart.dto';
import { CreateCartItemDto } from './cart-items/dto/create-cart-item.dto';
import { CartItemsService } from './cart-items/cart-items.service';
import { userInfo } from 'os';

@Injectable()
export class CartsService {
  constructor(private cartsRepository: CartsRepository, private cartItemsService: CartItemsService) {}

  /**
   * Busca todos los carritos
   * @returns {Cart[]} - Listado de carritos
   */
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
   * @returns {Cart} - Carrito de compras
   */
  async findGuestCart(id: number, response): Promise<Cart> {
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

  async addItemToCart(userId: number, createCartItemDto: CreateCartItemDto): Promise<Cart> {
    const cart = await this.findCartByUserId(userId);

    let cartItem = await this.cartItemsService.findOne(createCartItemDto.productId, cart.id);

    if(cartItem) {
      const quantity = cartItem.quantity + createCartItemDto.quantity;
      cartItem = await this.cartItemsService.update(createCartItemDto.productId, cart.id, { quantity: quantity});
    } else {
      cartItem = await this.cartItemsService.create({
        ...createCartItemDto,
        cartId: cart.id,
      }) 
    }
    return await this.findCartByUserId(userId);
  }

  //Otra opcion es borrar el carro y crear uno nuevo.Toma solo dos peticiones a la base de datos
  async emptyCart(userId: number): Promise<Cart> {
    const cart = await this.findCartByUserId(userId);
    await this.cartItemsService.removeAllFromCart(cart.id);
    return await this.findCartByUserId(userId);
  }
 
  async update(userId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    return await this.cartsRepository.update(userId, updateCartDto);
  }

}
