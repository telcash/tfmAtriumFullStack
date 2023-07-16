import { Exclude } from "class-transformer";
import { IsOptional } from "class-validator";

/**
 * Data Transfer Object para creación de un Carrito de compras
 * Validado con class-validator
 */
export class CreateCartDto {
    
    @IsOptional()
    @Exclude({
        toClassOnly: true,
    })
    userId?: number
}
