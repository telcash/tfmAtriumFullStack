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
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsRepository = exports.ProductsRepository = class ProductsRepository {
    constructor(prisma) {
        this.prisma = prisma;
        this.productConditionsForClients = {
            AND: [
                {
                    price: {
                        gt: 0,
                    },
                },
                {
                    image: {
                        not: null,
                    }
                },
                {
                    OR: [
                        {
                            availability: {
                                not: 'NEVER',
                            }
                        },
                        {
                            OR: [
                                {
                                    stock: {
                                        gt: 0,
                                    }
                                },
                                {
                                    availability: 'ALWAYS',
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    async create(createProductDto) {
        return await this.prisma.product.create({
            data: createProductDto,
        });
    }
    async findAll(categoryId) {
        const products = await this.prisma.product.findMany({
            where: {
                OR: [
                    {
                        categories: {
                            some: {
                                categoryId: categoryId,
                            }
                        }
                    },
                    {
                        categories: {
                            every: {
                                categoryId: categoryId,
                            }
                        }
                    }
                ]
            },
            include: {
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        },
                    }
                },
            }
        });
        const result = products.map(product => {
            return Object.assign(Object.assign({}, product), { categories: product.categories.map(category => category.category) });
        });
        return result;
    }
    async findAllForClients(categoryId, cartId) {
        return await this.prisma.product.findMany({
            where: {
                AND: [
                    this.productConditionsForClients,
                    {
                        categories: {
                            some: {
                                categoryId: categoryId,
                            }
                        }
                    }
                ]
            },
            include: {
                cartsItem: {
                    where: {
                        cartId: cartId
                    },
                    select: {
                        quantity: true,
                    }
                },
                categories: {
                    select: {
                        category: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            }
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id: id,
            },
            include: {
                categories: {
                    select: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        });
        return Object.assign(Object.assign({}, product), { categories: product.categories.map((category) => category.category) });
    }
    async findOneForClients(id) {
        return await this.prisma.product.findFirst({
            where: Object.assign({ id: id }, this.productConditionsForClients),
        });
    }
    async update(id, updateProductDto) {
        return await this.prisma.product.update({
            data: updateProductDto,
            where: {
                id: id,
            }
        });
    }
    async updateOnCartCheckout(products) {
        let operations = [];
        for (const product of products) {
            const updateProduct = this.prisma.product.update({
                data: {
                    stock: {
                        decrement: product.quantity,
                    },
                },
                where: {
                    id: product.productId,
                    OR: [
                        {
                            availability: 'ALWAYS'
                        },
                        {
                            AND: [
                                {
                                    stock: {
                                        gte: product.quantity,
                                    }
                                },
                                {
                                    availability: 'STOCK'
                                }
                            ]
                        }
                    ]
                }
            });
            operations.push(updateProduct);
        }
        return await this.prisma.$transaction(operations);
    }
    async rollbackInventory(products) {
        let operations = [];
        for (const product of products) {
            const updateProduct = this.prisma.product.update({
                data: {
                    stock: {
                        increment: product.quantity,
                    },
                },
                where: {
                    id: product.productId,
                }
            });
            operations.push(updateProduct);
        }
        return await this.prisma.$transaction(operations);
    }
    async remove(id) {
        return await this.prisma.product.delete({
            where: {
                id: id
            },
        });
    }
};
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsRepository);
//# sourceMappingURL=products.repository.js.map