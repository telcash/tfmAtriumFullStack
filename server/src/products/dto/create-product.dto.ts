import { Availability } from "@prisma/client";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

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
    @Type(() => Number)
    @IsNumber()
    stock?: number;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    availability?: Availability;
}
