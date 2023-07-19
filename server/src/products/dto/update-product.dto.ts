import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

/**
 * Data Transfer Object para la actualización de un producto
 * Validado con class-validator
 */
export class UpdateProductDto extends PartialType(CreateProductDto) {}
