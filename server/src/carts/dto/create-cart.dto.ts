import { Exclude } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

/**
 * Data Transfer Object para creación de un Carrito de compras
 * Validado con class-validator
 */
export class CreateCartDto {
    
    @IsOptional()
    @IsNumber()
    @Exclude({
        toClassOnly: true,
    })
    userId?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    total: number;

    @IsOptional()
    addressId?: number | null;

}
