import { CartStatus } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object para creación de un Carrito de compras
 * Validado con class-validator
 */
export class CreateCartDto {
    
    @IsOptional()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    status: CartStatus;
}
