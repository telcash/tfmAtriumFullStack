import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Availability } from '@prisma/client';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    stock?: number;
    availability?: Availability;
}
