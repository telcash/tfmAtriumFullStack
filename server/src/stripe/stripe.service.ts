import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

@Injectable()
export class StripeService {

  /**
   * Crea un paymentintent en Stripe
   * @param {number} orderAmount - Cantidad a pagar 
   * @returns - Objeto con la clave única para el cliente realizar el pago
   */
  async createPaymentIntent(orderAmount: number) {
    return await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: 'eur',
      payment_method_types: ['card'],
    });
  }

}
