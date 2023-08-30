import { Module, forwardRef } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { CartsModule } from 'src/carts/carts.module';


/**
 * Modulo encargado de productos
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
  imports: [forwardRef(() => CartsModule), ProductCategoriesModule],
})
export class ProductsModule {}
