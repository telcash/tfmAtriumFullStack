import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { CategoriesModule } from './categories/categories.module';

/**
 * Modulo encargado de productos
 */
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  imports: [CategoriesModule],
  exports: [ProductsService],
})
export class ProductsModule {}
