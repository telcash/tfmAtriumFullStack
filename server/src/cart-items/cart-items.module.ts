import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { CartsModule } from '../carts/carts.module';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService],
  imports: [CartsModule],
})
export class CartItemsModule {}
