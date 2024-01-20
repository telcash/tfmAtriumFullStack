"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const users_repository_1 = require("./users.repository");
const orders_module_1 = require("../orders/orders.module");
const products_module_1 = require("../products/products.module");
const stripe_module_1 = require("../stripe/stripe.module");
const auth_module_1 = require("../auth/auth.module");
let UsersModule = exports.UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [users_service_1.UsersService, users_repository_1.UsersRepository],
        controllers: [users_controller_1.UsersController],
        exports: [users_service_1.UsersService],
        imports: [
            (0, common_1.forwardRef)(() => orders_module_1.OrdersModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            products_module_1.ProductsModule,
            stripe_module_1.StripeModule,
        ],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map