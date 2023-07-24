import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

@Injectable()
export class StripeService {


    async createPaymentIntent(orderAmount: number) {
      return await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: 'eur',
        payment_method_types: ['card'],
      });
    }
}
