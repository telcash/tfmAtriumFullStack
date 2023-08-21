import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoriesRepository } from './product-categories.repository';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly productCategoriesRepository: ProductCategoriesRepository) {}

  /**
   * Gestiona la agregación de una categoría a un producto
   * @param {CreateProductCategoryDto} createProductCategoryDto 
   * @returns 
   */
  async create(createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoriesRepository.create(createProductCategoryDto);
  }

  /**
   * Gestiona la eliminación de una categoría a un producto
   * @param {CreateProductCategoryDto} createProductCategoryDto 
   * @returns 
   */
  async remove(createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoriesRepository.remove(createProductCategoryDto);
  }
}
