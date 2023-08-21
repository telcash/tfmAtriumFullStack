import { Exclude } from "class-transformer";
import { IsOptional, IsNumber } from "class-validator";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { CreateCartItemDto } from "../cart-items/dto/create-cart-item.dto";

/**
 * Dto para el checkout de un carrito
 */
export class CheckoutCartDto {
    
    @IsOptional()
    @IsNumber()
    userId?: number;

    @IsOptional()
    @IsNumber()
    addressId?: number;

    @IsOptional()
    @Exclude({
        toClassOnly: true,
    })
    cart?: any;

    @IsOptional()
    @Exclude({
        toClassOnly: true,
    })
    createOrderDto: CreateOrderDto;

    @IsOptional()
    @Exclude({
        toClassOnly: true,
    })
    items: CreateCartItemDto[];

}