import { Exclude } from "class-transformer";
import { IsOptional, IsNumber } from "class-validator";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";

/**
 * Dto para el checkout de un carrito
 */
export class CheckoutCartDto {
    [x: string]: {};
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
    items: any[];

}