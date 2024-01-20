"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const order_status_1 = require("./constants/order-status");
let OrdersRepository = exports.OrdersRepository = class OrdersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto, items) {
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
        });
    }
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
    async findOne(id) {
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
        });
    }
    async update(id, updateOrderDto) {
        return await this.prisma.order.update({
            where: {
                id: id,
            },
            data: updateOrderDto,
        });
    }
    async remove(id) {
        return await this.prisma.order.delete({
            where: {
                id: id,
                status: {
                    not: order_status_1.OrderStatus.PAID
                }
            }
        });
    }
    async findAllForUser(userId) {
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
                                id: true,
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
        });
    }
    async findOneForUser(id, userId) {
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
        });
    }
    async updateOneForUser(id, userId, updateOrderDto) {
        return await this.prisma.order.update({
            where: {
                id: id,
                userId: userId,
            },
            data: updateOrderDto,
        });
    }
    async removeOneForUser(id, userId) {
        return await this.prisma.order.delete({
            where: {
                id: id,
                userId: userId,
                status: {
                    not: order_status_1.OrderStatus.PAID
                }
            }
        });
    }
    async findByPaymentIntent(paymentIntent) {
        return await this.prisma.order.findFirst({
            where: {
                paymentIntent: {
                    contains: paymentIntent,
                }
            }
        });
    }
};
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersRepository);
//# sourceMappingURL=orders.repository.js.map