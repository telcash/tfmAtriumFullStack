import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { HashService } from 'src/common/services/hash.service';
import { UserRole } from 'src/users/constants/user-role';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

/**
 * Transforma CreateUserDto para registro de usuario tipo CLIENT
 */
@Injectable()
export class SignupPipe implements PipeTransform {
  
  constructor(private readonly hashService: HashService) {}

  /**
   * 
   * @param {CreateUserDto} createUserDto - DTO
   * @param {ArgumentMetadata} metadata 
   * @returns - DTO validado
   */
  async transform(createUserDto: CreateUserDto, metadata: ArgumentMetadata) {

    // Se realiza el hash del password recibido en el dto antes de crear el usuario en la base de datos
    const hashedPassword: string = await this.hashService.hashData(createUserDto.password);

    // Actualizamos los datos para la creación del usuario
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
