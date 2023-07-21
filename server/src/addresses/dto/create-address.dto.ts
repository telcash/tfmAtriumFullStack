import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

/**
 * Data transfer object para la craeación de una dirección
 */
export class CreateAddressDto {
    
    @IsOptional()
    @IsNumber()
    id: number;

    @Exclude({
        toClassOnly: true,
    })
    userId: number;
    
    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    country: string;

}
