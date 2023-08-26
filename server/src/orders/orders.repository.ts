import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderStatus } from "./constants/order-status";

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
        return await this.prisma.order.findMany({
            include: {
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        mobile: true,
                    }
                },
                address: {
                    select: {
                        street: true,
                        city: true,
                        postalCode: true,
                        country: true,
                    }
                },
                items: {
                    select: {
                        quantity: true,
                        price: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            }
                        }
                    }
                }
            }
        });
    }
    
    /**
     * Busca en la base de datos una orden por su id
     * @param {number} id - Id de la orden
     * @returns - Orden buscada
     */
    async findOne(id: number) {
        return await this.prisma.order.findUnique({
            where: {
                id: id,
            }
        })
    }

    /**
     * Actualiza en la base de datos una orden
     * @param {number} id - Id de la orden
     * @param {UpdateOrderDto} updateOrderDto - Dto con los datos para actualizar la orden 
     * @returns - Orden actualizada
     */
    async update(id: number, updateOrderDto: UpdateOrderDto) {
        return await this.prisma.order.update({
            where: {
                id: id,
            },
            data: updateOrderDto,
        })
    }

    /**
     * Elimina una orden de la base de datos
     * @param {number} id - Id de la orden 
     * @returns - Orden eliminada
     */
    async remove(id: number) {
        return await this.prisma.order.delete({
            where: {
                id: id,
                status: {
                    not: OrderStatus.PAID
                }
            }
        })
    }

    /**
     * Busca en la base de datos todas las ordenes pertenecientes a un usuario
     * @param {number} userId - Id del usuario
     * @returns - Listado de ordenes
     */
    async findAllForUser(userId: number) {
        return await this.prisma.order.findMany({
            where: {
                userId: userId,
            },
            include: {
                address: {
                    select: {
                        street: true,
                        city: true,
                        postalCode: true,
                        country: true,
                    }
                },
                items: {
                    select: {
                        quantity: true,
                        price: true,
                        product: {
                            select: {
                                name: true,
                                image: true,
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        })
    }

    /**
     * Busca en la base de datos una orden de un usuario
     * @param {number} id - Id de la orden 
     * @param {number} userId - Id del usuario
     * @returns - Orden buscada
     */
    async findOneForUser(id: number, userId: number) {
        return await this.prisma.order.findUnique({
            where: {
                id: id,
                userId: userId,
            }
        })
    }

    async removeOneForUser(id: number, userId: number) {
        return await this.prisma.order.delete({
            where: {
                id: id,
                userId: userId,
                status: {
                    not: OrderStatus.PAID
                }
            }
        })
    }

    async findByPaymentIntent(paymentIntent: string) {
        return await this.prisma.order.findFirst({
            where: {
                stripeClientSecret: {
                    contains: paymentIntent,
                }
            }
        })
    }
}