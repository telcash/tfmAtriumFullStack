import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { OrderStatus } from "../constants/order-status";

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
    stripeClientSecret: string;

    @IsNumber()
    addressId: number;
}
