import { Exclude, Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { ProductAvailability } from "../constants/product-availability";

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
    //@IsNumber()
    price?: number;
    
    @IsOptional()
    @IsString()
    @Exclude({
        toClassOnly: true,
    })
    image?: string;

    @IsOptional()
    @Type(() => Number)
    //@IsNumber()
    stock?: number;

    @IsOptional()
    @IsEnum(ProductAvailability)
    availability?: ProductAvailability;
}
