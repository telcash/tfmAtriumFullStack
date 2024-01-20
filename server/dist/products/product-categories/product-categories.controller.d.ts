import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
export declare class ProductCategoriesController {
    private readonly productCategoriesService;
    constructor(productCategoriesService: ProductCategoriesService);
    create(createProductCategoryDto: CreateProductCategoryDto): Promise<{
        productId: number;
        categoryId: number;
    }>;
    remove(createProductCategoryDto: CreateProductCategoryDto): Promise<{
        productId: number;
        categoryId: number;
    }>;
}
