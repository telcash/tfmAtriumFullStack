import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Cart } from "@prisma/client";


/**
 * Repositorio para manejar entidades Cart en la base de datos
 */
@Injectable()
export class CartsRepository{

    constructor(private readonly prisma: PrismaService) {}

    /**
     * Crea un carrito en la base de datos según un id de usuario
     * @param {number} userId - Id de usuario
     * @returns - Carrito de compra
     */
    async create(userId: number) {
        return await this.prisma.cart.create({
          data: {
            userId: userId,
          },
          include: {
            products: true,
          }
        });
    }

    /**
     * Busca todos los carritos en la base de datos
     * @returns - Listado de carritos
     */
    async findAll() {
        return await this.prisma.cart.findMany({
          include: {
            user: true,
            products: true,
          }
        });
    }

    /**
     * Busca un carrito en la base de datos según su id
     * @param {number} id - Id de carrito 
     * @returns {Cart} - Carrito buscado
     */
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

    /**
     * Busca un carrito en la base de datos según id de usuario
     * @param {number} userId - Id de usuario 
     * @returns - Carrito buscado
     */
    async findOneByUserId(userId: number) {
      return await this.prisma.cart.findUnique({
        where: {
          userId: userId,
        },
        include: {
          products: true,
        }
      })
    }

}