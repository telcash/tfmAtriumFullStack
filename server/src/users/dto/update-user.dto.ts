import { PartialType } from "@nestjs/mapped-types";
import { Role } from "@prisma/client";
import { IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

/**
 * Data Transfer Object para la actualización de datos de un usuario
 */
export class UpdateUserDto extends PartialType(CreateUserDto){
    @IsOptional()
    @IsString()
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
    password?: string;

    @IsOptional()
    @MinLength(9)
    @MaxLength(15)
    mobile?: string;

    @IsOptional()
    @IsString()
    refreshToken?: string = null;
}