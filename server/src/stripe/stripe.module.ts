import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';

/**
 * Modulo encargado de las funciones de la pasarela de pagos Stripe
 */
@Module({
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
