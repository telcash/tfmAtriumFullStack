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
exports.DeleteOrderInterceptor = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("../orders.service");
const order_status_1 = require("../constants/order-status");
const stripe_service_1 = require("../../stripe/stripe.service");
const products_service_1 = require("../../products/products.service");
const user_role_1 = require("../../users/constants/user-role");
let DeleteOrderInterceptor = exports.DeleteOrderInterceptor = class DeleteOrderInterceptor {
    constructor(ordersService, stripeService, productsService) {
        this.ordersService = ordersService;
        this.stripeService = stripeService;
        this.productsService = productsService;
    }
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const userId = req.user.sub;
        const role = req.user.role;
        const orderId = req.params['id'];
        const order = role === user_role_1.UserRole.ADMIN ? await this.ordersService.findOne(+orderId)
            : await this.ordersService.findOneForUser(+orderId, userId);
        if (order.status === order_status_1.OrderStatus.PAID) {
            throw new common_1.BadRequestException("The order can't be deleted before is finished");
        }
        if (order.status === order_status_1.OrderStatus.WAITING_PAYMENT && order.paymentIntent) {
            await this.stripeService.cancelPaymentIntent(order.paymentIntent);
        }
        if (order.status === order_status_1.OrderStatus.STARTED || order.status === order_status_1.OrderStatus.WAITING_PAYMENT) {
            await this.productsService.rollbackInventory(order.items.map((item) => {
                return { productId: item.product.id, quantity: item.quantity };
            }));
        }
        return next.handle();
    }
};
exports.DeleteOrderInterceptor = DeleteOrderInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        stripe_service_1.StripeService,
        products_service_1.ProductsService])
], DeleteOrderInterceptor);
//# sourceMappingURL=delete-order.interceptor.js.map