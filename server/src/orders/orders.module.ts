import { Module, forwardRef } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { StripeModule } from 'src/stripe/stripe.module';
import { ProductsModule } from 'src/products/products.module';

/**
 * Modulo encargado de las funciones de Órdenes
 */
@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  imports: [forwardRef(() => StripeModule), forwardRef(() => ProductsModule) ],
  exports: [OrdersService],
})
export class OrdersModule {}
