import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

/**
 * Data Transfer Object para actualización de un Carrito de compras
 * Validado con class-validator
 */
export class UpdateCartDto extends PartialType(CreateCartDto) {}
