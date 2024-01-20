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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const update_order_dto_1 = require("./dto/update-order.dto");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_1 = require("../users/constants/user-role");
const user_decorator_1 = require("../users/decorators/user.decorator");
const update_order_interceptor_1 = require("./interceptors/update-order.interceptor");
const delete_order_interceptor_1 = require("./interceptors/delete-order.interceptor");
const update_order_pipe_1 = require("./pipes/update-order.pipe");
const order_entity_1 = require("./entities/order.entity");
let OrdersController = exports.OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async findAll() {
        const orders = await this.ordersService.findAll();
        return orders.map((order) => new order_entity_1.OrderEntity(order));
    }
    async findAllForUser(userId) {
        const orders = await this.ordersService.findAllForUser(userId);
        return orders.map((order) => new order_entity_1.OrderEntity(order));
    }
    async findOne(id) {
        return new order_entity_1.OrderEntity(await this.ordersService.findOne(+id));
    }
    async update(id, updateOrderDto) {
        return new order_entity_1.OrderEntity(await this.ordersService.update(+id, updateOrderDto));
    }
    async remove(id) {
        return new order_entity_1.OrderEntity(await this.ordersService.remove(+id));
    }
    async findOneForUser(id, userId) {
        return new order_entity_1.OrderEntity(await this.ordersService.findOneForUser(+id, userId));
    }
    async updateOneForUser(id, userId, updateOrderDto) {
        return new order_entity_1.OrderEntity(await this.ordersService.updateOneForUser(+id, userId, updateOrderDto));
    }
    async removeOneForUser(id, userId) {
        return new order_entity_1.OrderEntity(await this.ordersService.removeOneForUser(+id, userId));
    }
};
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/myorders'),
    __param(0, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findAllForUser", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseInterceptors)(update_order_interceptor_1.UpdateOrderInterceptor),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)(update_order_pipe_1.UpdateOrderPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.UseInterceptors)(delete_order_interceptor_1.DeleteOrderInterceptor),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/myorders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "findOneForUser", null);
__decorate([
    (0, common_1.UseInterceptors)(update_order_interceptor_1.UpdateOrderInterceptor),
    (0, common_1.Patch)('/myorders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('sub')),
    __param(2, (0, common_1.Body)(update_order_pipe_1.UpdateOrderPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateOneForUser", null);
__decorate([
    (0, common_1.UseInterceptors)(delete_order_interceptor_1.DeleteOrderInterceptor),
    (0, common_1.Delete)('/myorders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "removeOneForUser", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map