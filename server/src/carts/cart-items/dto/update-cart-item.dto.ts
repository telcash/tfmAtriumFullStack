import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart-item.dto';
import { IsNumber } from 'class-validator';

/**
 * DTO para la actualización de un item en carrito
 * Validada con class-validator
 */
export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
    @IsNumber()
    quantity: number;
}
