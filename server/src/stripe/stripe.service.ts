import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { OrderStatus } from "src/orders/constants/order-status";
import { OrdersService } from "src/orders/orders.service";
import Stripe from "stripe";
import { StripeClientSecretEntity } from "./entities/stripe-client-secret.entity";

const stripe: Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

/**
 * Servicio que implementa las funciones de Stripe
 */
@Injectable()
export class StripeService {

  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  /**
   * Crea un paymentintent en Stripe
   * @param {number} orderId - Id de la orden
   * @param {number} userId - Id del usuario
   * @returns {StripeClientSecretEntity} - Objeto con la clave única para el cliente realizar el pago
   */
  async createPaymentIntent(orderId: number, userId: number): Promise<StripeClientSecretEntity> {

    // Busca la orden asociacada al usuario
    const order = await this.ordersService.findOneForUser(orderId, userId)

    // Si el estado de la orden es 'PAID' o 'COMPLETED' no se genera el paymentIntent
    if(order.status === OrderStatus.PAID || order.status === OrderStatus.COMPLETED) {
      throw new BadRequestException('The order is already paid')
    }

    // Si el estado de la orden es 'CANCELLED' no se genera el paymenIntent
    if(order.status === OrderStatus.CANCELLED) {
      throw new BadRequestException('The order was cancelled')
    }

    // Si existe un paymenIntent anterior para la orden, este se cancela
    if(order.paymentIntent) {
      await this.cancelPaymentIntent(order.paymentIntent);
    }

    // Ajusta el monto de la orden a la mínima unidad de la moneda, por requisitos de Stripe
    const orderAmount = order.total * 100;

    // Solicita a Stripe la creación de un nuevo paymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderAmount,
      currency: 'eur',
      payment_method_types: ['card'],
    });
    
    // Actualiza la orden con el nuevo paymentIntent y cambiamos su estado a 'WAITING_PAYMENT'
    await this.ordersService.update(orderId, 
      { 
        paymentIntent: paymentIntent.id,
        status: OrderStatus.WAITING_PAYMENT,
      }
    );

    // Retorna al cliente el client_secret necesario para proceder con el pago
    return { clientSecret: paymentIntent.client_secret };
  }

  /**
   * Maneja peticiones automáticas de Stripe
   * Estas peticiones se generan cada vez que hay una actualización de un paymentIntent
   * @param request - Objeto request de la petició
   * @param response - Objeto response de la petició
   */
  async handleStripeRequest(request: any, response: any) {

    // Obtiene el event de Stripe del Raw Body del request
    let event = request.rawBody;

    // Obtiene la clave secreta del punto de acceso
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    // Obtiene la signature de Stripe de los headers del request
    const signature = request.headers['stripe-signature'];

    // Verifica el evento de Stripe, con su signature y la clave secreta del endpoint
    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        signature,
        endpointSecret,
      );
    // Si hay un error lo notifica
    } catch (err) {
      throw new ForbiddenException(`Webhook signature verification failed.`);
    }
 
    // Manejo del evento según el tipo de evento
    switch (event.type) {

      // Intento exitoso
      case 'payment_intent.succeeded':

        // Obtenemos el paymentIntent del evento
        const paymentIntent = event.data.object;

        // LLamamos al método que maneja los eventos de tipo 'payment_intent.succeeded'
        await this.handlePaymentIntentSucceeded(paymentIntent.id);
        break;

      // Evento inesperado
      default: 
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Devolvemos la respuesta a Stripe para informarles que se recibió y se manejo el evento
    response.send();
  }

  /**
   * Método que maneja los eventos de tipo 'payment_intent.succeeded'
   * @param {string} paymentIntent - paymentIntent de Stripe
   */
  async handlePaymentIntentSucceeded(paymentIntent: string) {
    
    // Obtiene el id de la orden correspondiente al paymentIntent
    const id = (await this.ordersService.findByPaymentIntent(paymentIntent)).id;

    // Actualiza el estado de la orden a 'PAID'
    await this.ordersService.update(id, { status: OrderStatus.PAID })
  }

  /**
   * Método que cancela un paymentIntent de Stripe
   * @param paymentIntent - PaymentIntent a cancelar
   * @returns 
   */
  async cancelPaymentIntent(paymentIntent: string) {
    return await stripe.paymentIntents.cancel(paymentIntent);
  }

}

