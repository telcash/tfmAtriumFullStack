import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

@Injectable()
export class StripeService {


    async createPaymentIntent(orderAmount: number) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: orderAmount,
        currency: 'eur',
        payment_method_types: ['card'],
      });

      return {
        clientSecret: paymentIntent.client_secret,
      }
    }
}
