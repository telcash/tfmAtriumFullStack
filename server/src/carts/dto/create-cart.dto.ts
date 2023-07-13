import { CartStatus } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    
    userId: number;

    @IsString()
    status: CartStatus;
}
