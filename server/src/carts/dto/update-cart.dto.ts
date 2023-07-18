import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

/**
 * Data Transfer Object para actualización de un Carrito de compras
 * Validado con class-validator
 */
export class UpdateCartDto extends PartialType(CreateCartDto) {
    @IsOptional()
    @IsNumber()
    @Exclude({
        toClassOnly: true,
    })
    userId?: number
}
