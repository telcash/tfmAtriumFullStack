import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Cart } from "@prisma/client";
import { UpdateCartDto } from "./dto/update-cart.dto";



@Injectable()
export class CartsRepository{
    constructor(private prisma: PrismaService) {}

    async create(userId: number): Promise<Cart> {
        return await this.prisma.cart.create({
          data: {
            userId: userId,
          },
          include: {
            products: true,
          }
        });
    }

    async findAll(): Promise<Cart[]> {
        return await this.prisma.cart.findMany({
          include: {
            user: true,
            products: true,
          }
        });
    }

    async findOneById(id: number): Promise<Cart> {
      return await this.prisma.cart.findUnique({
        where: {
          id: id,
        },
        include: {
          products: true,
        }
      })
    }

    async findOneByUserId(userId: number): Promise<Cart> {
      return await this.prisma.cart.findUnique({
        where: {
          userId: userId,
        },
        include: {
          products: true,
        }
      })
    }

    async update(userId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
        return await this.prisma.cart.update({
          data : updateCartDto,
          where: {
            userId: userId,
          },
        })
    }

    async removeByUserId(userId: number): Promise<Cart> {
        return await this.prisma.cart.delete({
          where: {
            userId: userId,
          }
        })
    }
}