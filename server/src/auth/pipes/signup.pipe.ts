import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
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
@Injectable()
export class SignupPipe implements PipeTransform {
  
  constructor(private readonly hashService: HashService) {}

  /**
   * Implementación del método transform del Pipe
   * @param {CreateUserDto} createUserDto - DTO con los datos para registro de usuario recibidos en la petición
   * @param {ArgumentMetadata} metadata 
   * @returns - DTO validado
   */
  async transform(createUserDto: CreateUserDto, metadata: ArgumentMetadata) {

    // Se realiza el hash de la contraseña recibida en el DTO antes de crear el usuario en la base de datos
    const hashedPassword: string = await this.hashService.hashData(createUserDto.password);

    // Actualizamos los datos en el DTO con los datos correspondientes a un nuevo usuario tipo CLIENT que se registra
    createUserDto = {
      ...createUserDto,
      role: UserRole.CLIENT,
      password: hashedPassword,
      refreshToken: null,
    };

    // Retornamos el DTO transformado
    return createUserDto;
  }
}
