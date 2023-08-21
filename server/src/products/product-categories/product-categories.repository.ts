import { Injectable } from "@nestjs/common";
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class ProductCategoriesRepository {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Agrega una categoría a un producto
     * @param {CreateProductCategoryDto} createProductCategoryDto - Dto para agregar la categoría a un producto
     * @returns 
     */
    async create(createProductCategoryDto: CreateProductCategoryDto) {
        return await this.prisma.productsOnCategories.create({
            data: createProductCategoryDto,
        })
    }

    /**
     * Elimina una categoría de un producto
     * @param {CreateProductCategoryDto} createProductCategoryDto - Dto para eliminar la categoría de un producto
     * @returns 
     */
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