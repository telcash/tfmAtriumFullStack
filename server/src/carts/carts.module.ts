import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { CartsRepository } from './carts.repository';
import { CartItemsService } from './cart-items/cart-items.service';
import { CartItemsRepository } from './cart-items/cart-items.repository';

@Module({
  controllers: [CartsController],
  providers: [CartsService, CartsRepository, CartItemsService, CartItemsRepository],
  exports: [CartsService]
})
export class CartsModule {}
