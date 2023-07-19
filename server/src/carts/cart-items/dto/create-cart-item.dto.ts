import { IsNumber, IsOptional } from "class-validator";

/**
 * Dto para la creación de un item en carrito
 * Validada con class-validator
 */
export class CreateCartItemDto {
    @IsNumber()
    productId: number;

    @IsOptional()
    @IsNumber()
    cartId: number;
    
    @IsNumber()
    quantity: number;
}
