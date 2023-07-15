import { CartStatus, Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * Data Transfer Object para creación de un Carrito de compras
 * Validado con class-validator
 */
export class CreateCartDto implements Prisma.CartCreateWithoutUserInput {
    
    @IsOptional()
    @Exclude({
        toClassOnly: true,
    })
    userId: number

    @IsNotEmpty()
    @IsString()
    status: CartStatus;
    
    @IsOptional()
    @Exclude({
        toClassOnly: true,
    })
    createdAt?: Date;
    
    @IsOptional()
    @Exclude({
        toClassOnly: true,
    })
    updatedAt?: Date;
}
