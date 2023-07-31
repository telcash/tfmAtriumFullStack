import { Injectable } from "@nestjs/common";
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { PrismaService } from "src/prisma/prisma.service";



@Injectable()
export class ProductCategoriesRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createProductCategoryDto: CreateProductCategoryDto) {
        return await this.prisma.productsOnCategories.create({
            data: createProductCategoryDto,
        })
    }

    async remove(createProductCategoryDto: CreateProductCategoryDto) {
        return await this.prisma.productsOnCategories.delete({
            where: {
                productId_categoryId: {
                    productId: createProductCategoryDto.productId,
                    categoryId: createProductCategoryDto.categoryId,
                }
            }
        })
    }
    
}