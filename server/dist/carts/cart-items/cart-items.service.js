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
exports.CartItemsService = void 0;
const common_1 = require("@nestjs/common");
const cart_items_repository_1 = require("./cart-items.repository");
let CartItemsService = exports.CartItemsService = class CartItemsService {
    constructor(cartItemsRepository) {
        this.cartItemsRepository = cartItemsRepository;
    }
    async upsert(createCartItemDto) {
        return await this.cartItemsRepository.upsert(createCartItemDto);
    }
    async findAll(cartId) {
        return await this.cartItemsRepository.findAll(cartId);
    }
    async findOne(productId, cartId) {
        return await this.cartItemsRepository.findOne(productId, cartId);
    }
    async update(updateCartItemDto) {
        return await this.cartItemsRepository.update(updateCartItemDto);
    }
    async remove(updateCartItemDto) {
        return await this.cartItemsRepository.remove(updateCartItemDto.productId, updateCartItemDto.cartId);
    }
    async removeAll(cartId) {
        return await this.cartItemsRepository.removeAll(cartId);
    }
};
exports.CartItemsService = CartItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cart_items_repository_1.CartItemsRepository])
], CartItemsService);
//# sourceMappingURL=cart-items.service.js.map