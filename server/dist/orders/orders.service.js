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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_repository_1 = require("./orders.repository");
let OrdersService = exports.OrdersService = class OrdersService {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }
    async create(createOrderDto, items) {
        return this.ordersRepository.create(createOrderDto, items);
    }
    async findAll() {
        return await this.ordersRepository.findAll();
    }
    async findOne(id) {
        return await this.ordersRepository.findOne(id);
    }
    async update(id, updateOrderDto) {
        return await this.ordersRepository.update(id, updateOrderDto);
    }
    async remove(id) {
        return await this.ordersRepository.remove(id);
    }
    async findAllForUser(userId) {
        return await this.ordersRepository.findAllForUser(userId);
    }
    async findOneForUser(id, userId) {
        return await this.ordersRepository.findOneForUser(id, userId);
    }
};
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map