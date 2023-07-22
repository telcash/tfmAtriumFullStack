import { Module, forwardRef } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { CartsModule } from '../carts.module';
import { ProductsModule } from 'src/products/products.module';
import { CartItemsRepository } from './cart-items.repository';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, CartItemsRepository],
  imports: [forwardRef(() => CartsModule), ProductsModule],
  exports: [CartItemsService]
})
export class CartItemsModule {}
