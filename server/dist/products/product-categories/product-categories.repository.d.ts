import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { PrismaService } from "src/prisma/prisma.service";
export declare class ProductCategoriesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProductCategoryDto: CreateProductCategoryDto): Promise<{
        productId: number;
        categoryId: number;
    }>;
    remove(createProductCategoryDto: CreateProductCategoryDto): Promise<{
        productId: number;
        categoryId: number;
    }>;
}
