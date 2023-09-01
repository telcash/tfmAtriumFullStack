import { CanActivate, ConflictException, ExecutionContext, Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserRole } from '../constants/user-role';

/**
 * Guard que evita que la solicitud se procese si hay un solo Admin registrado en la base de datos
 * Sirve para evitar que se elimine o modifique al único Admin del sistema
 * Extrae del request el rol del usuario, si es ADMIN verifica en la base de datos la cantidad de Admins registrados
 * Permite el acceso si hay más de un Admin registrado
 */
@Injectable()
export class LastAdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Implementación del método canActivate del Guard
   * @param {ExecutionContext} context - Contexto de ejecución
   * @returns {boolean} - True si hay más de un Admin registrado
   */
  async canActivate(context: ExecutionContext,): Promise<boolean> {

    let userId: number;
    let role: string;

    // Extrae el request del context
    const req = context.switchToHttp().getRequest();

    //Chequea si el url de la petición es '/users/profile'
    if(req.url === '/users/profile') {

      // Si es así el usuario a eliminar la cuenta es quien hace la petición
      userId = req.user.sub;
      role = req.user.role
    } else {

      // Si no es así, el id del usuario está en los parámetros del url
      userId = +req.params['id'];
      // Buscamos el rol del usuario a eliminar
      role = (await this.usersService.findUserById(userId)).role;
    }

    
    // Si el usuario es el único Admin del sistema lanzamos un error
    if (role === UserRole.ADMIN && await this.usersService.countUsersByRole(UserRole.ADMIN) <= 1) {
      throw new ConflictException("Can't delete or modify the only admin");
    }

    return true;
  }
}
