import { ArgumentMetadata, Inject, Injectable, PipeTransform, Scope, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { AuthService } from '../auth.service';
import { HashService } from 'src/common/services/hash.service';

/**
 * Valida UpdatePasswordDto
 */
@Injectable({ scope: Scope.REQUEST} )
export class PasswordUpdatePipe implements PipeTransform {
  constructor(
    @Inject(REQUEST) private readonly req,
    private readonly authService: AuthService,
    private readonly hashService: HashService,
  ) {}

  /**
   * Valida UpdatePasswordDto
   * @param {UpdatePasswordDto} updatePasswordDto - DTO
   * @param {ArgumentMetadata} metadata 
   * @returns - Nuevo password hasheado
   */
  async transform(updatePasswordDto: UpdatePasswordDto, metadata: ArgumentMetadata) {

    // Validamos que el nuevo password y su verificación sean iguales
    if (updatePasswordDto.newPassword !== updatePasswordDto.newPasswordConfirmation) {
      throw new UnauthorizedException('Confirm password does not match password')
    }

    // Valida el usuario (verifica que el password viejo es correcto)
    // Lanza un error si no lo es
    await this.authService.validateUser(this.req.user.email, updatePasswordDto.password);

    // Hashing del nuevo password
    const hashedPassword: string = await this.hashService.hashData(updatePasswordDto.newPassword);

    // Retorna nuevo password hasheado
    return { password: hashedPassword };
  }
}
