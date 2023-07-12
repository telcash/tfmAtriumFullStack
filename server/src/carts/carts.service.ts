import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, createCartDto: CreateCartDto) {
    const cart = await this.prisma.cart.create({
      data: {
        ...createCartDto,
        userId: userId,
      },
    });
    return cart;
  }

  async findAll() {
    const carts = await this.prisma.cart.findMany({
      include: {
        user: true,
        products: true,
      }
    });
    return carts;
  }

  async findOne(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        products: true,
      }
    })
    return cart;
  }

  async update(userId: number, updateCartDto: UpdateCartDto) {
    const updatedCart = await this.prisma.cart.update({
      data : updateCartDto,
      where: {
        userId: userId,
      },
    })
    return updatedCart;
  }

  async remove(userId: number) {
    const deletedCart = await this.prisma.cart.delete({
      where: {
        userId: userId,
      }
    })
    return deletedCart;
  }
}
