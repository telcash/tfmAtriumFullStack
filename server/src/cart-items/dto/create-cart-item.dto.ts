import { IsNumber } from "class-validator";

export class CreateCartItemDto {
    @IsNumber()
    productId: number;

    @IsNumber()
    cartId: number;
    
    @IsNumber()
    quantity: number;
}
