import { IsNumber, IsOptional, Min } from "class-validator";

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
    
    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity: number;
}
