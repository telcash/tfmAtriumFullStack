import { Injectable } from "@nestjs/common";
import { CartItem, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

/**
 * Repositiorio para manejar entidades CartItem en la base de datos
 */
@Injectable()
export class CartItemsRepository {

    constructor(private readonly prisma: PrismaService) {}

    /**
     * Crea un CartItem en la base de datos
     * @param {CreateCartItemDto} createCartItemDto - DTO
     * @returns {CartItem} - CartItem creado
     */
    async create(createCartItemDto: CreateCartItemDto): Promise<CartItem> {
        return await this.prisma.cartItem.create({
            data: createCartItemDto,
        })
    }

    /**
     * Busca un CartItem en la base de datos por id de producto y id de carrito
     * @param {number} productId - Id de producto 
     * @param {number} cartId - Id de carrito 
     * @returns {CartItem} - CartItem buscado
     */
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

    /**
     * Actualiza un CartItem en la base de datos
     * @param {number} productId - Id de producto
     * @param {number} cartId - Id de carrito
     * @param {UpdateCartItemDto} updateCartItemDto - DTO
     * @returns {CartItem} - CartItem actualizado
     */
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

    /**
     * Elimina todos los CartItem de un carrito de la base de datos
     * @param {number} cartId - Id de carrito 
     * @returns {Prisma.BatchPayload} - Objeto con propiedad count de valor igual a los CartItems eliminados
     */
    async removeAllFromCart(cartId: number): Promise<Prisma.BatchPayload> {
        const payload = await this.prisma.cartItem.deleteMany({
            where: {
                cartId: cartId,
            }
        })
        return payload;
    }
}