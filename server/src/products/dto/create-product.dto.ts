import { Availability, Prisma } from "@prisma/client";
import { Exclude, Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

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
    @IsNumber()
    price?: number;
    
    @IsOptional()
    @IsString()
    @Exclude({
        toClassOnly: true,
    })
    image?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    stock?: number;

    @IsOptional()
    @IsString()
    availability?: Availability;
}
