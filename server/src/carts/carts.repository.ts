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

    async findOne(userId: number): Promise<Cart> {
        return await this.prisma.cart.findUnique({
          where: {
            userId: userId,
          },
          include: {
            user: true,
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

    async remove(userId: number): Promise<Cart> {
        return await this.prisma.cart.delete({
          where: {
            userId: userId,
          }
        })
    }
}