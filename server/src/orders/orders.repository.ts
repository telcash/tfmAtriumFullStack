import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrdersRepository {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Crea en la base de datos una orden con todos los productos asociados
     * @param {CreateOrderDto} createOrderDto - Dto para crear la orden 
     * @param items - Listado de productos que contiene la orden
     * @returns - Orden creda
     */
    async create(createOrderDto: CreateOrderDto, items) {
        console.log(createOrderDto)
        console.log(items)
        return await this.prisma.order.create({
            data: {
                userId: createOrderDto.userId,
                total: createOrderDto.total,
                status: createOrderDto.status,
                stripeClientSecret: createOrderDto.stripeClientSecret,
                addressId: createOrderDto.addressId,
                items: {
                    create: items,
                }
            }
        })
    }

    /**
     * Busca en la base de datos un listado de todas las ordenes
     * @returns - Listado de las ordenes
     */
    async findAll() {
        return await this.prisma.order.findMany();
    }
    
    /**
     * 
     * @param id 
     * @returns 
     */
    async findOne(id: number) {
        return await this.prisma.order.findUnique({
            where: {
                id: id,
            }
        })
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        return await this.prisma.order.update({
            where: {
                id: id,
            },
            data: updateOrderDto,
        })
    }

    async remove(id: number) {
        return await this.prisma.order.delete({
            where: {
                id: id,
            }
        })
    }

    async findAllForUser(userId: number) {
        return await this.prisma.order.findMany({
            where: {
                userId: userId,
            }
        })
    }

    async findOneForUser(id: number, userId: number) {
        return await this.prisma.order.findUnique({
            where: {
                id: id,
                userId: userId,
            }
        })
    }
}