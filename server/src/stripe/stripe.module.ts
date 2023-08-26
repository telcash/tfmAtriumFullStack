import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { OrdersModule } from 'src/orders/orders.module';


/**
 * Modulo encargado de las funciones de la pasarela de pagos Stripe
 */
@Module({
  imports: [OrdersModule],
  providers: [StripeService],
  exports: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
