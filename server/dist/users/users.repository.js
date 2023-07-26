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
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersRepository = exports.UsersRepository = class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        return await this.prisma.user.create({
            data: createUserDto,
        });
    }
    async findAll() {
        return await this.prisma.user.findMany();
    }
    async findUserByEmail(email) {
        return await this.prisma.user.findUniqueOrThrow({
            where: {
                email: email,
            },
            include: {
                addresses: true,
                orders: true,
                cart: true,
            },
        });
    }
    async findUserById(id) {
        return await this.prisma.user.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: {
                addresses: true,
                orders: true,
                cart: true,
            },
        });
    }
    async update(id, updateUserDto) {
        return await this.prisma.user.update({
            data: updateUserDto,
            where: {
                id: id,
            },
            include: {
                addresses: true,
                orders: true,
                cart: true,
            },
        });
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: {
                id: id,
            },
        });
    }
    async countUsersByRole(role) {
        return await this.prisma.user.count({
            where: {
                role: role,
            }
        });
    }
};
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map