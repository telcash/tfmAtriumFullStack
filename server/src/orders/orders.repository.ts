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
        return await this.prisma.order.create({
            data: {
                userId: createOrderDto.userId,
                total: createOrderDto.total,
                status: createOrderDto.status,
                paymentIntent: createOrderDto.paymentIntent,
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
            },
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
                                image: true,
                            }
                        }
                    }
                }
            },
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
                                id: true,
                                name: true,
                                image: true,
                            }
                        }
                    }
                }
            },
        })
    }

    /**
     * Actualiza en la base de datos una orden de un usuario identificado
     * @param {number} id - Id de la orden
     * @param {number} userId - Id del usuario
     * @param {UpdateOrderDto} updateOrderDto - Dto con los datos de actualización
     * @returns - Orden actualizada
     */
    async updateOneForUser(id: number, userId: number, updateOrderDto: UpdateOrderDto) {
        return await this.prisma.order.update({
            where: {
                id: id,
                userId: userId,
            },
            data: updateOrderDto,
        })
    }
    /**
     * Elimina en la base de datos una orden de un usuario identificado
     * @param {number} id - Id de la orden
     * @param {number} userId - Id del usuario
     * @returns - Orden eliminada
     */
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

    /**
     * Busca el base de datos una orden según su paymentIntent de Stripe
     * @param {string} paymentIntent 
     * @returns - Orden buscada
     */
    async findByPaymentIntent(paymentIntent: string) {
        return await this.prisma.order.findFirst({
            where: {
                paymentIntent: {
                    contains: paymentIntent,
                }
            }
        })
    }
}