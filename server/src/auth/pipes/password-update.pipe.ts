import { ArgumentMetadata, Inject, Injectable, PipeTransform, Scope, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { AuthService } from '../auth.service';
import { HashService } from 'src/common/services/hash.service';

/**
 * Pipe que realiza validaciones adicionales al DTO {@link UpdatePasswordDto} con los datos para actualización de contraseña de un usuario
 * {@link UpdatePasswordDto} tiene validaciones previas implementadas con class-validator
 * Valida que la nueva contraseña y su confirmación coinciden
 * Valida que la contraseña actual del usuario sea correcta
 * Realiza el hasheo de la nueva contraseña
 * Retorna la nueva contraseña hasheado si el proceso de validación fue correcto
 */
@Injectable({ scope: Scope.REQUEST} )
export class PasswordUpdatePipe implements PipeTransform {
  
  constructor(
    @Inject(REQUEST) private readonly req,
    private readonly authService: AuthService,
    private readonly hashService: HashService,
  ) {}

  /**
   * Implementación del método transform del Pipe
   * @param {UpdatePasswordDto} updatePasswordDto - DTO con los datos para actualización
   * @param {ArgumentMetadata} metadata 
   * @returns - Contraseña nueva hasheada
   */
  async transform(updatePasswordDto: UpdatePasswordDto, metadata: ArgumentMetadata) {

    // Validamos que la contraseña nueva y su verificación sean iguales
    if (updatePasswordDto.newPassword !== updatePasswordDto.newPasswordConfirmation) {
      throw new UnauthorizedException('Confirm password does not match password')
    }

    // Valida el usuario (verifica que la contraseña actual es correcta)
    // Lanza un error si no lo es
    await this.authService.validateUser(this.req.user.email, updatePasswordDto.password);

    // Hashing de la nueva contraseña
    const hashedPassword: string = await this.hashService.hashData(updatePasswordDto.newPassword);

    // Retorna la nueva contraseña hasheada
    return { password: hashedPassword };
  }
}
