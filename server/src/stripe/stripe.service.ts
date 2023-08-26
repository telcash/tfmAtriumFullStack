import { Injectable } from "@nestjs/common";
import { OrderStatus } from "src/orders/constants/order-status";
import { OrdersService } from "src/orders/orders.service";
import Stripe from "stripe";

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

@Injectable()
export class StripeService {

  constructor(private readonly ordersService: OrdersService) {}

  /**
   * Crea un paymentintent en Stripe
   * @param {number} orderAmount - Cantidad a pagar 
   * @returns - Objeto con la clave única para el cliente realizar el pago
   */
  async createPaymentIntent(orderAmount: number) {
    console.log('intento de pago')
    return await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: 'eur',
      payment_method_types: ['card'],
    });
  }

  async handleStripeRequest(request: any, response: any) {
    let event = request.rawBody;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    if(endpointSecret) {
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.rawBody,
          signature,
          endpointSecret,
        );
      } catch (err) {
        console.log( `Webhook signature verification failed.`, err.message);
      }
    
    }

    //const paymentIntent = event.data.payment_intent;

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        await this.handlePaymentIntentSucceeded(paymentIntent.id);
        break;
      case 'payment_intent.processing':
        console.log('El pago se está procesando.');
      break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default: 
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }

  async handlePaymentIntentSucceeded(paymentIntent: string) {
    const id =(await this.ordersService.findByPaymentIntent(paymentIntent)).id;
    await this.ordersService.update(id, { status: OrderStatus.PAID })
  }

}

