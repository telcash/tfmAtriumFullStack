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

  async createWithUserId(userId?: number): Promise<Cart> {
    return await this.cartsRepository.create(userId);
  }

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
    let cart = await this.cartsRepository.findOneByUserId(userId);
    if (!cart) {
      cart = await this.cartsRepository.create(userId);
    }
    return cart;
  }

  async findGuestCart(id: number, response) {
    if(id) {
      return await this.cartsRepository.findOneById(id);
    }
    const cart = await this.cartsRepository.create(null);
    response.cookie('cartId', cart.id, {
      httpOnly: true,
      signed: true,
      sameSite: true,
    });
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

  /* async emptyCart(userId: number): Promise<Cart> {
    return aconst cart = await this.findCartByUserId(userId);
  }
 */
  async update(userId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    return await this.cartsRepository.update(userId, updateCartDto);
  }

  async remove(id: number): Promise<Cart> {
    return await this.cartsRepository.remove(id);
  }
}
