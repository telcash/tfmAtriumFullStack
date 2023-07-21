import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

/**
 * Data transfer object para actualización de la contraseña de un usuario
 * Validado con class-validator
 */
export class UpdatePasswordDto {
    /**
     * Contraseña actual del usuario
     */
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

    /**
     * Nueva contraseña del usuario
     */
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

    /**
     * Confirmación de la nueva contraseña
     */
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
    newPasswordConfirmation: string;
}