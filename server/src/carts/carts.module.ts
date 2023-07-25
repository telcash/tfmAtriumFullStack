import { Module, forwardRef } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { CartItemsModule } from './cart-items/cart-items.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { ProductsModule } from 'src/products/products.module';
import { OrdersModule } from 'src/orders/orders.module';
import { AddressesModule } from 'src/addresses/addresses.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
  imports: [forwardRef(() => CartItemsModule), ProductsModule, OrdersModule, StripeModule, AddressesModule, UsersModule],
  exports: [CartsService]
})
export class CartsModule {}
