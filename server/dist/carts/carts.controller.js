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
exports.CartsController = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const set_req_user_interceptor_1 = require("../auth/interceptors/set-req-user.interceptor");
const set_request_user_cart_interceptor_1 = require("./interceptors/set-request-user-cart.interceptor");
const jwt_access_guard_1 = require("../auth/guards/jwt-access.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_1 = require("../users/constants/user-role");
const cart_entity_1 = require("./entities/cart.entity");
const user_decorator_1 = require("../users/decorators/user.decorator");
const checkout_pipe_1 = require("./pipes/checkout/checkout.pipe");
const checkout_cart_dto_1 = require("./dto/checkout-cart.dto");
let CartsController = exports.CartsController = class CartsController {
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    async findAll() {
        const carts = await this.cartsService.findAll();
        return carts.map((cart) => new cart_entity_1.CartEntity(cart));
    }
    async findMyCart(cart) {
        return new cart_entity_1.CartEntity(cart);
    }
    async emptyCart(cart) {
        return new cart_entity_1.CartEntity(await this.cartsService.emptyCart(+cart.id));
    }
    async checkout(checkoutCartDto) {
        return await this.cartsService.checkout(checkoutCartDto);
    }
    findOne(id) {
        return this.cartsService.findOne(+id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor),
    (0, common_1.Get)('/mycart'),
    __param(0, (0, user_decorator_1.User)('cart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "findMyCart", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor),
    (0, common_1.Delete)('/mycart'),
    __param(0, (0, user_decorator_1.User)('cart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "emptyCart", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor),
    (0, common_1.Post)('/mycart/checkout'),
    __param(0, (0, common_1.Body)(checkout_pipe_1.CheckoutPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkout_cart_dto_1.CheckoutCartDto]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "checkout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_access_guard_1.JwtAccessGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)(user_role_1.UserRole.ADMIN),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "findOne", null);
exports.CartsController = CartsController = __decorate([
    (0, common_1.Controller)('carts'),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], CartsController);
//# sourceMappingURL=carts.controller.js.map