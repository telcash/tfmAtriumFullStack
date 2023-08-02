import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";



@Injectable()
export class CartItemsRepository {

    constructor(private readonly prisma: PrismaService) {}

    /**
     * Busca todos los items en un carrito
     * @param cartId - Id del carrito
     * @returns - Listado de items
     */
    async findAll(cartId: number) {
        return await this.prisma.cartItem.findMany({
            where: {
                cartId: cartId,
            },
            select: {
                productId: true,
                quantity: true,
            }
        })
    }

    async findOne(productId: number, cartId: number) {
        return await this.prisma.cartItem.findUnique({
            where: {
                productId_cartId: {
                    productId: productId,
                    cartId: cartId,
                }
            }
        })
    }

    /**
     * Crea un CartItem en la base de datos
     * @param {CreateCartItemDto} createCartItemDto - DTO del CartItem
     * @returns - CartItem creado
     */
    async create(createCartItemDto: CreateCartItemDto) {
        return await this.prisma.cartItem.create({
            data: createCartItemDto,
        })
    }

    /**
     * Actualiza un CartItem en la base de datos
     * @param {UpdateCartItemDto} updateCartItemDto - DTO
     * @returns - CartItem actualizado
     */
    async update(updateCartItemDto: UpdateCartItemDto) {
        return await this.prisma.cartItem.update({
            data: {
                quantity: updateCartItemDto.quantity,
            },
            where: {
                productId_cartId: {
                    productId: updateCartItemDto.productId,
                    cartId: updateCartItemDto.cartId,
                }
            }
        })
    }

    async upsert(createCartItemDto: CreateCartItemDto) {
        return await this.prisma.cartItem.upsert({
            where: {
                productId_cartId: {
                    productId: createCartItemDto.productId,
                    cartId: createCartItemDto.cartId,
                },
            },
            update: {
                quantity: {
                    increment: createCartItemDto.quantity,
                }
            },
            create: createCartItemDto,
            
        })
    }

    /**
     * Elimina un CartItem de la base de datos
     * @param productId - Id del producto
     * @param cartId - Id del carrito
     */
    async remove(productId: number, cartId: number) {
        return await this.prisma.cartItem.delete({
            where: {
                productId_cartId: {
                    productId: productId,
                    cartId: cartId,
                }
            }
        })
    }

    /**
     * Elimina todos los CartItem de un carrito de la base de datos
     * @param {number} cartId - Id de carrito 
     * @returns  - Cantidad de CartItems eliminados
     */
    async removeAll(cartId: number) {
        const payload = await this.prisma.cartItem.deleteMany({
            where: {
                cartId: cartId,
            }
        })
        return payload.count;
    }

}