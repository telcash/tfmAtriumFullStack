import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Role } from '@prisma/client';
import { HashService } from 'src/common/services/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class SignupPipe implements PipeTransform {
  constructor(private readonly hashService: HashService) {}

  async transform(createUserDto: CreateUserDto, metadata: ArgumentMetadata) {

    // Se realiza el hash del password recibido en el dto antes de crear el usuario en la base de datos
    const hashedPassword: string = await this.hashService.hashData(createUserDto.password);
    
    // Actualizamos los datos para la creación del usuario
    createUserDto = {
      ...createUserDto,
      role: Role.CLIENT,
      password: hashedPassword,
      refreshToken: null,
    };

    return createUserDto;
  }
}
