import { IsNumber, IsOptional } from "class-validator";

export class CreateOrderDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsNumber()
    userId: number;

    @IsNumber()
    addressId: number;

    
    createdAt: Date;
    updatedAt: Date;
}
