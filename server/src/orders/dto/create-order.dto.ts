import { IsNumber, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsNumber()
    userId: number;

    total: number;

    status: string;

    @IsNumber()
    addressId: number;
}
