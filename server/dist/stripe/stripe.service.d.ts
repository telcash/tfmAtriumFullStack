import Stripe from "stripe";
export declare class StripeService {
    createPaymentIntent(orderAmount: number): Promise<Stripe.Response<Stripe.PaymentIntent>>;
}
