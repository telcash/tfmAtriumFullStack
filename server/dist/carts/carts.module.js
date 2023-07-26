"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsModule = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const carts_controller_1 = require("./carts.controller");
const carts_repository_1 = require("./carts.repository");
const cart_items_module_1 = require("./cart-items/cart-items.module");
const stripe_module_1 = require("../stripe/stripe.module");
const products_module_1 = require("../products/products.module");
const orders_module_1 = require("../orders/orders.module");
const addresses_module_1 = require("../addresses/addresses.module");
const users_module_1 = require("../users/users.module");
let CartsModule = exports.CartsModule = class CartsModule {
};
exports.CartsModule = CartsModule = __decorate([
    (0, common_1.Module)({
        controllers: [carts_controller_1.CartsController],
        providers: [carts_service_1.CartsService, carts_repository_1.CartsRepository],
        imports: [(0, common_1.forwardRef)(() => cart_items_module_1.CartItemsModule), products_module_1.ProductsModule, orders_module_1.OrdersModule, stripe_module_1.StripeModule, addresses_module_1.AddressesModule, users_module_1.UsersModule],
        exports: [carts_service_1.CartsService]
    })
], CartsModule);
//# sourceMappingURL=carts.module.js.map