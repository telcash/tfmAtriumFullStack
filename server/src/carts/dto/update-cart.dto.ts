import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
    @IsOptional()
    @IsString()
    status: string;
}
