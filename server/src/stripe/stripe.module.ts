import { Module, forwardRef } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { OrdersModule } from 'src/orders/orders.module';


/**
 * Modulo encargado de las funciones de la pasarela de pagos Stripe
 */
@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [
    forwardRef(() => OrdersModule),
  ],
  exports: [StripeService],
})
export class StripeModule {}
