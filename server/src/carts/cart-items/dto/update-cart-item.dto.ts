import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDto } from './create-cart-item.dto';
import { IsNumber } from 'class-validator';

export class UpdateCartItemDto extends PartialType(CreateCartItemDto) {
    @IsNumber()
    quantity: number;
}
