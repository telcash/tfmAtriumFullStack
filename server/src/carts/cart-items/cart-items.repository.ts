import { Injectable } from "@nestjs/common";
import { CartItem } from "@prisma/client";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";



@Injectable()
export class CartItemsRepository {
    constructor(private prisma: PrismaService) {}

    async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
        return await this.prisma.cartItem.create({
            data: createCartItemDto,
        })
    }

    async findOne(productId: number, cartId: number): Promise<CartItem> {
        return await this.prisma.cartItem.findUnique({
            where: {
                productId_cartId: {
                    productId: productId,
                    cartId: cartId,
                }
            }
        })
    }

    async update(productId: number, cartId:number, updateCartItemDto: UpdateCartItemDto): Promise<CartItem> {
        return await this.prisma.cartItem.update({
            data: updateCartItemDto,
            where: {
                productId_cartId: {
                    productId: productId,
                    cartId: cartId,
                }
            }
        })
    }
}