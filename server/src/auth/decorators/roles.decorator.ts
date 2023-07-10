import { SetMetadata } from "@nestjs/common";

/**
 * Decorador para anotar los roles necesarios para acceder a un endpoitn
 * @param {string} roles - Listado de roles
 * @returns 
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);