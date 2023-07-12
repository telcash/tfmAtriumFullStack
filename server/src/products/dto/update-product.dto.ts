import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Availability } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsOptional, IsString, MinLength, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(3)
    description?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    stock?: number;

    @IsOptional()
    @IsString()
    availability?: Availability;
}
