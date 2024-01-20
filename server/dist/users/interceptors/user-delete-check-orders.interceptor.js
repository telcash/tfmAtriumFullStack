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
exports.UserDeleteCheckOrdersInterceptor = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../../orders/orders.service");
const order_status_1 = require("../../orders/constants/order-status");
const products_service_1 = require("../../products/products.service");
const stripe_service_1 = require("../../stripe/stripe.service");
let UserDeleteCheckOrdersInterceptor = exports.UserDeleteCheckOrdersInterceptor = class UserDeleteCheckOrdersInterceptor {
    constructor(ordersService, productsService, stripeService) {
        this.ordersService = ordersService;
        this.productsService = productsService;
        this.stripeService = stripeService;
    }
    async intercept(context, next) {
        let userId;
        const req = context.switchToHttp().getRequest();
        if (req.url === '/users/profile') {
            userId = req.user.sub;
        }
        else {
            userId = +req.params['id'];
        }
        const orders = await this.ordersService.findAllForUser(userId);
        if (orders.filter(order => order.status === order_status_1.OrderStatus.PAID).length > 0) {
            throw new common_1.BadRequestException("Can't delete user because has pending orders");
        }
        const waitingPaymentOrders = orders.filter(order => order.status === order_status_1.OrderStatus.WAITING_PAYMENT);
        if (waitingPaymentOrders.length > 0) {
            waitingPaymentOrders.forEach(async (order) => await this.stripeService.cancelPaymentIntent(order.paymentIntent));
            await this.rollbackInventory(waitingPaymentOrders);
        }
        const startedOrders = orders.filter(order => order.status === order_status_1.OrderStatus.STARTED);
        if (startedOrders.length > 0) {
            await this.rollbackInventory(startedOrders);
        }
        return next.handle();
    }
    async rollbackInventory(orders) {
        orders.forEach(async (order) => {
            await this.productsService.rollbackInventory(order.items.map((item) => {
                return { productId: item.product.id, quantity: item.quantity };
            }));
        });
    }
};
exports.UserDeleteCheckOrdersInterceptor = UserDeleteCheckOrdersInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        products_service_1.ProductsService,
        stripe_service_1.StripeService])
], UserDeleteCheckOrdersInterceptor);
//# sourceMappingURL=user-delete-check-orders.interceptor.js.map