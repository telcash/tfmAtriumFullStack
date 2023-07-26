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
exports.CartItemsController = void 0;
const common_1 = require("@nestjs/common");
const cart_items_service_1 = require("./cart-items.service");
const create_cart_item_dto_1 = require("./dto/create-cart-item.dto");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
const set_req_user_interceptor_1 = require("../../auth/interceptors/set-req-user.interceptor");
const set_request_user_cart_interceptor_1 = require("../interceptors/set-request-user-cart.interceptor");
const cart_item_pipe_1 = require("./pipes/cart-item.pipe");
const cart_item_entity_1 = require("./entities/cart-item.entity");
const user_decorator_1 = require("../../users/decorators/user.decorator");
const update_total_interceptor_1 = require("../interceptors/update-total.interceptor");
let CartItemsController = exports.CartItemsController = class CartItemsController {
    constructor(cartItemsService) {
        this.cartItemsService = cartItemsService;
    }
    async findAllItems(cart) {
        const items = await this.cartItemsService.findAll(cart.id);
        return items.map((item) => new cart_item_entity_1.CartItemEntity(item));
    }
    async create(createCartItemDto) {
        return new cart_item_entity_1.CartItemEntity(await this.cartItemsService.create(createCartItemDto));
    }
    async update(updateCartItemDto) {
        return new cart_item_entity_1.CartItemEntity(await this.cartItemsService.update(updateCartItemDto));
    }
    async remove(updateCartItemDto) {
        return await this.cartItemsService.remove(updateCartItemDto);
    }
};
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('cart')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartItemsController.prototype, "findAllItems", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor, update_total_interceptor_1.UpdateTotalInterceptor),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(cart_item_pipe_1.CartItemPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cart_item_dto_1.CreateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartItemsController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor, update_total_interceptor_1.UpdateTotalInterceptor),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)(cart_item_pipe_1.CartItemPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartItemsController.prototype, "update", null);
__decorate([
    (0, common_1.UseInterceptors)(set_req_user_interceptor_1.SetRequestUserInterceptor, set_request_user_cart_interceptor_1.SetRequestUserCartInterceptor, update_total_interceptor_1.UpdateTotalInterceptor),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Body)(cart_item_pipe_1.CartItemPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cart_item_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", Promise)
], CartItemsController.prototype, "remove", null);
exports.CartItemsController = CartItemsController = __decorate([
    (0, common_1.Controller)('carts/mycart/items'),
    __metadata("design:paramtypes", [cart_items_service_1.CartItemsService])
], CartItemsController);
//# sourceMappingURL=cart-items.controller.js.map