import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoriesRepository } from './product-categories.repository';

@Injectable()
export class ProductCategoriesService {
  constructor(private readonly productCategoriesRepository: ProductCategoriesRepository) {}

  async create(createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoriesRepository.create(createProductCategoryDto);
  }

  async remove(createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoriesRepository.remove(createProductCategoryDto);
  }
}
