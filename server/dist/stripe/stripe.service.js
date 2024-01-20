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
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const order_status_1 = require("../orders/constants/order-status");
const orders_service_1 = require("../orders/orders.service");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
let StripeService = exports.StripeService = class StripeService {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async createPaymentIntent(orderId, userId) {
        const order = await this.ordersService.findOneForUser(orderId, userId);
        if (order.status === order_status_1.OrderStatus.PAID || order.status === order_status_1.OrderStatus.COMPLETED) {
            throw new common_1.BadRequestException('The order is already paid');
        }
        if (order.status === order_status_1.OrderStatus.CANCELLED) {
            throw new common_1.BadRequestException('The order was cancelled');
        }
        if (order.paymentIntent) {
            await this.cancelPaymentIntent(order.paymentIntent);
        }
        const orderAmount = order.total * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderAmount,
            currency: 'eur',
            payment_method_types: ['card'],
        });
        await this.ordersService.update(orderId, {
            paymentIntent: paymentIntent.id,
            status: order_status_1.OrderStatus.WAITING_PAYMENT,
        });
        return { clientSecret: paymentIntent.client_secret };
    }
    async handleStripeRequest(request, response) {
        let event = request.rawBody;
        const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(request.rawBody, signature, endpointSecret);
        }
        catch (err) {
            throw new common_1.ForbiddenException(`Webhook signature verification failed.`);
        }
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                await this.handlePaymentIntentSucceeded(paymentIntent.id);
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }
        response.send();
    }
    async handlePaymentIntentSucceeded(paymentIntent) {
        const id = (await this.ordersService.findByPaymentIntent(paymentIntent)).id;
        await this.ordersService.update(id, { status: order_status_1.OrderStatus.PAID });
    }
    async cancelPaymentIntent(paymentIntent) {
        return await stripe.paymentIntents.cancel(paymentIntent);
    }
};
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map