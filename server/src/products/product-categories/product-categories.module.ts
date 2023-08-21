import { Module } from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoriesRepository } from './product-categories.repository';

/**
 * Modulo encargado de las funciones de agregar o eliminar categorías a los productos
 */
@Module({
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService, ProductCategoriesRepository],
})
export class ProductCategoriesModule {}
