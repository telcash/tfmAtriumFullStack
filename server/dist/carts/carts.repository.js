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
exports.CartsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartsRepository = exports.CartsRepository = class CartsRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCartDto) {
        return await this.prisma.cart.create({
            data: createCartDto,
            include: {
                items: true,
                address: true,
            }
        });
    }
    async findAll() {
        return await this.prisma.cart.findMany({
            include: {
                user: true,
                items: true,
                address: true,
            }
        });
    }
    async findOne(id) {
        return await this.prisma.cart.findUnique({
            where: {
                id: id,
            },
            include: {
                items: true,
                address: true,
            },
        });
    }
    async findOneByUserId(userId) {
        return await this.prisma.cart.findUnique({
            where: {
                userId: userId,
            },
            include: {
                items: true,
                address: true,
            }
        });
    }
    async update(cartId, updateCartDto) {
        return await this.prisma.cart.update({
            data: updateCartDto,
            where: {
                id: cartId,
            },
            include: {
                items: true,
                address: true,
            }
        });
    }
    async remove(cartId) {
        return await this.prisma.cart.delete({
            where: {
                id: cartId,
            }
        });
    }
};
exports.CartsRepository = CartsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartsRepository);
//# sourceMappingURL=carts.repository.js.map