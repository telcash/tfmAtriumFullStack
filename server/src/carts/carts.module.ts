import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { CartItemsModule } from '../cart-items/cart-items.module';

@Module({
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
  exports: [CartsService]
})
export class CartsModule {}
