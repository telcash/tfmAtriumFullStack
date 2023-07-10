import { Role } from "@prisma/client";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

/**
 * Data Transfer Object para la actualización de datos de un usuario
 */
export class UpdateUserDto {
    @IsOptional()
    role?: Role;

    @IsOptional()
    @IsString()
    @MinLength(2)
    firstName?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    lastName?: string;

    @IsOptional()
    @MinLength(9)
    @MaxLength(15)
    mobile?: string;

    @IsOptional()
    @IsString()
    refreshToken?: string;
}