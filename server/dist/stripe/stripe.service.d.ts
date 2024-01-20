import { OrdersService } from "src/orders/orders.service";
import Stripe from "stripe";
import { StripeClientSecretEntity } from "./entities/stripe-client-secret.entity";
export declare class StripeService {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createPaymentIntent(orderId: number, userId: number): Promise<StripeClientSecretEntity>;
    handleStripeRequest(request: any, response: any): Promise<void>;
    handlePaymentIntentSucceeded(paymentIntent: string): Promise<void>;
    cancelPaymentIntent(paymentIntent: string): Promise<Stripe.Response<Stripe.PaymentIntent>>;
}
