import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

/**
 * Data Transfer Object para creación (signup) de un usuario
 * Validado con class-validator
 */
export class CreateUserDto {
    @IsOptional()
    @IsEnum(Role)
    role?: Role;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }
    )
    @MaxLength(16)
    password: string;

    @IsNotEmpty()
    @MinLength(9)
    @MaxLength(15)
    mobile: string;
    
    @IsOptional()
    @IsString()
    refreshToken?: string = null;
}