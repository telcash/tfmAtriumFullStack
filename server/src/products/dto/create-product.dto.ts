import { Exclude, Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, Min, MinLength } from "class-validator";
import { ProductAvailability } from "../constants/product-availability";
import { CreateProductCategoryDto } from '../product-categories/dto/create-product-category.dto';

/**
 * Data Transfer Object para creación de un producto
 * Validado con class-validator
 */
export class CreateProductDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    description: string;

    @IsOptional()
    @Type(() => Number)
    @Min(0)
    price?: number;
    
    @IsOptional()
    @IsString()
    @Exclude({
        toClassOnly: true,
    })
    image?: string;

    @IsOptional()
    @Type(() => Number)
    stock?: number;

    @IsOptional()
    @IsEnum(ProductAvailability)
    availability?: ProductAvailability;

}
