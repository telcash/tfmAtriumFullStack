import { CanActivate, ConflictException, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UsersService } from '../users.service';

/**
 * Evita que sea eliminado un Admin del sistema si es el único Admin actual
 */
@Injectable()
export class LastAdminGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    // Determinamos el rol del usuario
    const role = context.switchToHttp().getRequest().user.role;

    // Si el usuario es el único Admin del sistema lanzamos un error
    if (role === Role.ADMIN && await this.usersService.countUsersByRole(Role.ADMIN) === 1) {
      throw new ConflictException("Can't delete the only admin");
    }

    return true;
  }
}
