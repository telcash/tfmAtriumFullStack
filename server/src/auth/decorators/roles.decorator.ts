import { SetMetadata } from "@nestjs/common";

/**
 * Decorador para anotar los roles necesarios para acceder a un endpoint protegido con {@link RoleGuard}
 * {@link RoleGuard} extrae de este decorador el listado de roles autorizados
 * @param {string} roles - Listado de roles
 * @returns 
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);