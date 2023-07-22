import { Exclude } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { UserRole } from "../constants/user-role";

/**
 * Data Transfer Object para creación (signup) de un usuario
 * Validado con class-validator
 */
export class CreateUserDto {
    
    @IsOptional()
    @IsEnum(UserRole)
    @Exclude({
        toClassOnly: true,
    })
    role: UserRole;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
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
    @Exclude({
        toClassOnly: true,
    })
    refreshToken: string;
}