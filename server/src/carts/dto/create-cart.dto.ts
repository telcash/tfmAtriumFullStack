import { CartStatus } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateCartDto {
    @IsString()
    status: CartStatus;
}
