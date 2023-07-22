import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCartDto } from "./dto/create-cart.dto";


@Injectable()
export class CartsRepository {

    constructor(private readonly prisma: PrismaService) {}

    /**
     * Crea un carrito en la base de datos
     * @param {CreateCartDto} createCartDto - Dto con los datos para la cración del carrito 
     * @returns - Carrito de compra
     */
    async create(createCartDto: CreateCartDto) {
        return await this.prisma.cart.create({
            data: createCartDto,
            include: {
                products: true,
            }
        });
    }

    /**
     * Busca un listado de todos los carritos en la base de datos
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
     * @returns - Carrito buscado
     */
    async findOne(id: number) {
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