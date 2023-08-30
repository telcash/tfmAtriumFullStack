import { ArgumentMetadata, Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { HashService } from 'src/common/services/hash.service';
import { UserRole } from 'src/users/constants/user-role';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

/**
 * Pipe que transforma el DTO {@link CreateUserDto} para registro de usuario tipo CLIENT
 * Le asigna al DTO la propiedad Role con el valor de CLIENT
 * Hashea la contraseña recibida del usuario y cambia su valor en el DTO por el hash obtenido
 * Le asigna al Json Web Token de refrescamiento el valor null
 * Retorna el DTO con las modificaciones
 */
@Injectable({ scope: Scope.REQUEST})
export class SignupPipe implements PipeTransform {
  
  constructor(
    @Inject(REQUEST) private readonly req,
    private readonly hashService: HashService
  ) {}

  /**
   * Implementación del método transform del Pipe
   * @param {CreateUserDto} createUserDto - DTO con los datos para registro de usuario recibidos en la petición
   * @param {ArgumentMetadata} metadata 
   * @returns - DTO validado
   */
  async transform(createUserDto: CreateUserDto, metadata: ArgumentMetadata) {

    // Se realiza el hash de la contraseña recibida en el DTO antes de crear el usuario en la base de datos
    const hashedPassword: string = await this.hashService.hashData(createUserDto.password);

    // Verificamos que no se esté intentando registrar como Admin un usuario
    if(!this.req.user || (this.req.user && this.req.user.role !== UserRole.ADMIN)) {
      createUserDto.role = UserRole.CLIENT;
    }
    
    // Actualizamos los datos en el DTO con los datos correspondientes a un nuevo usuario tipo CLIENT que se registra
    createUserDto = {
      ...createUserDto,
      password: hashedPassword,
      refreshToken: null,
    };

    // Retornamos el DTO transformado
    return createUserDto;
  }
}
