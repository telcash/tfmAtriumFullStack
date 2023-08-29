import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../constants/order-status";

/**
 * Dto para la creación de una orden
 */
export class CreateOrderDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    userId: number;

    total: number;

    @IsEnum(OrderStatus)
    status: string;

    @IsString()
    paymentIntent?: string;

    @IsNumber()
    addressId: number;
}
