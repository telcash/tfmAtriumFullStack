"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemsModule = void 0;
const common_1 = require("@nestjs/common");
const cart_items_service_1 = require("./cart-items.service");
const cart_items_controller_1 = require("./cart-items.controller");
const carts_module_1 = require("../carts.module");
const products_module_1 = require("../../products/products.module");
const cart_items_repository_1 = require("./cart-items.repository");
let CartItemsModule = exports.CartItemsModule = class CartItemsModule {
};
exports.CartItemsModule = CartItemsModule = __decorate([
    (0, common_1.Module)({
        controllers: [cart_items_controller_1.CartItemsController],
        providers: [cart_items_service_1.CartItemsService, cart_items_repository_1.CartItemsRepository],
        imports: [(0, common_1.forwardRef)(() => carts_module_1.CartsModule), products_module_1.ProductsModule],
        exports: [cart_items_service_1.CartItemsService]
    })
], CartItemsModule);
//# sourceMappingURL=cart-items.module.js.map