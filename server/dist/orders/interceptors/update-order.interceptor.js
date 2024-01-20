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
exports.UpdateOrderInterceptor = void 0;
const common_1 = require("@nestjs/common");
const order_status_1 = require("../constants/order-status");
const orders_service_1 = require("../orders.service");
const products_service_1 = require("../../products/products.service");
const stripe_service_1 = require("../../stripe/stripe.service");
const user_role_1 = require("../../users/constants/user-role");
let UpdateOrderInterceptor = exports.UpdateOrderInterceptor = class UpdateOrderInterceptor {
    constructor(ordersService, stripeService, productsService) {
        this.ordersService = ordersService;
        this.stripeService = stripeService;
        this.productsService = productsService;
    }
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const updateOrderDto = req.body;
        const userId = req.user.sub;
        const role = req.user.role;
        const orderId = req.params['id'];
        const order = role === user_role_1.UserRole.ADMIN ? await this.ordersService.findOne(+orderId)
            : await this.ordersService.findOneForUser(+orderId, userId);
        if (updateOrderDto.status === order_status_1.OrderStatus.CANCELLED) {
            if (order.status === order_status_1.OrderStatus.STARTED || order.status === order_status_1.OrderStatus.WAITING_PAYMENT) {
                if (order.paymentIntent) {
                    await this.stripeService.cancelPaymentIntent(order.paymentIntent);
                }
                await this.productsService.rollbackInventory(order.items.map((item) => {
                    return { productId: item.product.id, quantity: item.quantity };
                }));
            }
        }
        else if (updateOrderDto.status === order_status_1.OrderStatus.COMPLETED) {
            if (req.user.role !== user_role_1.UserRole.ADMIN) {
                throw new common_1.UnauthorizedException('Only Admins can update order status as COMPLETED');
            }
            if (order.status !== order_status_1.OrderStatus.PAID) {
                throw new common_1.BadRequestException('The order is not paid');
            }
        }
        return next.handle();
    }
};
exports.UpdateOrderInterceptor = UpdateOrderInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService,
        stripe_service_1.StripeService,
        products_service_1.ProductsService])
], UpdateOrderInterceptor);
//# sourceMappingURL=update-order.interceptor.js.map