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
exports.CartItemsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CartItemsRepository = exports.CartItemsRepository = class CartItemsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(cartId) {
        return await this.prisma.cartItem.findMany({
            where: {
                cartId: cartId,
            },
        });
    }
    async findOne(productId, cartId) {
        return await this.prisma.cartItem.findUnique({
            where: {
                productId_cartId: {
                    productId: productId,
                    cartId: cartId,
                }
            }
        });
    }
    async create(createCartItemDto) {
        return await this.prisma.cartItem.create({
            data: createCartItemDto,
        });
    }
    async update(updateCartItemDto) {
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
        });
    }
    async upsert(createCartItemDto) {
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
        });
    }
    async remove(productId, cartId) {
        return await this.prisma.cartItem.delete({
            where: {
                productId_cartId: {
                    productId: productId,
                    cartId: cartId,
                }
            }
        });
    }
    async removeAll(cartId) {
        const payload = await this.prisma.cartItem.deleteMany({
            where: {
                cartId: cartId,
            }
        });
        return payload.count;
    }
};
exports.CartItemsRepository = CartItemsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartItemsRepository);
//# sourceMappingURL=cart-items.repository.js.map