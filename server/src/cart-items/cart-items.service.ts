import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  /* async create(userId: number, createCartItemDto: CreateCartItemDto) {
    const cart = await this.cartsService.findOne(userId);
    if (!cart) {
      throw new BadRequestException('Cart not founded');
    }

    let cartItem = await this.prisma.cartItem.findUnique({
      where: {
        productId_cartId: {
          productId: createCartItemDto.productId,
          cartId: cart.id,
        }
      }
    })

    if (cartItem) {
      // update 
    } else {
      cartItem = await this.prisma.cartItem.create({
        data: {
          ...createCartItemDto,
          cartId: cart.id,
        }
      })
    }
    return cartItem;
  } */

  findAll() {
    return `This action returns all cartItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartItem`;
  }

  /* async update(id: number, updateCartItemDto: UpdateCartItemDto) {
    const updatedCartItem = await this.prisma.cartItem.update({
      where: {
        productId_cartId: {
          productId: 1,
          cartId: 1,
        }
      },
      data: updateCartItemDto,
    })
    return `This action updates a #${id} cartItem`;
  } */

  remove(id: number) {
    return `This action removes a #${id} cartItem`;
  }
}
