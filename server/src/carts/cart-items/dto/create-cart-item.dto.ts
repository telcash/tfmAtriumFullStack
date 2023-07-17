import { IsNumber, IsOptional } from "class-validator";

export class CreateCartItemDto {
    @IsNumber()
    productId: number;

    @IsOptional()
    @IsNumber()
    cartId: number;
    
    @IsNumber()
    quantity: number;
}
