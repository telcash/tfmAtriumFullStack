import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { OrdersModule } from 'src/orders/orders.module';
import { ProductsModule } from 'src/products/products.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { AuthModule } from 'src/auth/auth.module';

/**
 * Modulo encargado de las funciones de usuarios
 */
@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    forwardRef(() => OrdersModule),
    forwardRef(() => AuthModule),
    ProductsModule,
    StripeModule,
  ],
})
export class UsersModule {}
