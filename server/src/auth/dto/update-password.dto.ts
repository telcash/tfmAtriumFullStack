import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";


export class UpdatePasswordDto {
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
    oldPassword: string;

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
    newPassword: string;

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
    newPasswordVerification: string;
}