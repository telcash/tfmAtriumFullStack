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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const carts_repository_1 = require("./carts.repository");
const cart_items_service_1 = require("./cart-items/cart-items.service");
const products_service_1 = require("../products/products.service");
const orders_service_1 = require("../orders/orders.service");
let CartsService = exports.CartsService = class CartsService {
    constructor(cartsRepository, cartItemsService, productsService, ordersService) {
        this.cartsRepository = cartsRepository;
        this.cartItemsService = cartItemsService;
        this.productsService = productsService;
        this.ordersService = ordersService;
    }
    async create(createCartDto) {
        return await this.cartsRepository.create(createCartDto);
    }
    async findAll() {
        return await this.cartsRepository.findAll();
    }
    async findOne(id) {
        return await this.cartsRepository.findOne(id);
    }
    async findOneByUserId(userId) {
        return await this.cartsRepository.findOneByUserId(userId);
    }
    async remove(id) {
        return await this.cartsRepository.remove(id);
    }
    async emptyCart(cartId) {
        await this.cartItemsService.removeAll(cartId);
        return await this.cartsRepository.update(cartId, { total: 0 });
    }
    async updateTotal(cartId) {
        let cart = await this.cartsRepository.findOne(cartId);
        let total = 0;
        for (const item of cart.items) {
            total += item.price * item.quantity;
        }
        cart = await this.cartsRepository.update(cartId, { total: total });
        return total;
    }
    async updateMyCart(cartId, updateCartDto) {
        return await this.cartsRepository.update(cartId, updateCartDto);
    }
    async checkout(checkoutCartDto) {
        await this.productsService.updateOnCartCheckout(checkoutCartDto.cart.items);
        const order = await this.ordersService.create(checkoutCartDto.createOrderDto, checkoutCartDto.items);
        await this.emptyCart(checkoutCartDto.cart.id);
        return order.id;
    }
    async mergeCarts(userCartId, guestCartId) {
        const guestCartItems = await this.cartItemsService.findAll(guestCartId);
        guestCartItems.forEach(async (item) => {
            item.cartId = userCartId;
            await this.cartItemsService.upsert(item);
        });
    }
};
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [carts_repository_1.CartsRepository,
        cart_items_service_1.CartItemsService,
        products_service_1.ProductsService,
        orders_service_1.OrdersService])
], CartsService);
//# sourceMappingURL=carts.service.js.map