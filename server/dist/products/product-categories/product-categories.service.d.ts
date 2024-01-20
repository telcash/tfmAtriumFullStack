import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { ProductCategoriesRepository } from './product-categories.repository';
export declare class ProductCategoriesService {
    private readonly productCategoriesRepository;
    constructor(productCategoriesRepository: ProductCategoriesRepository);
    create(createProductCategoryDto: CreateProductCategoryDto): Promise<{
        productId: number;
        categoryId: number;
    }>;
    remove(createProductCategoryDto: CreateProductCategoryDto): Promise<{
        productId: number;
        categoryId: number;
    }>;
}
