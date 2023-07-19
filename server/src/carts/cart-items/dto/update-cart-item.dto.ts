import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart-item.dto';

/**
 * DTO para la actualización de un item en carrito
 * Validada con class-validator
 */
export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {}
