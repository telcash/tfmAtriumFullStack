import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

/**
 * Guard que verifica que el usuario tiene un rol válido para acceder al endpoint
 */
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    /**
     * 
     * @param {ExecutionContext} context
     * @returns {boolean} true si el rol del usuario está entre los roles exigidos
     */
    canActivate(context: ExecutionContext): boolean {
        
        // Extrae el listado roles exigidos en el decorador @Role del endpoint
        const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
        
        // Si no hay rol exigido el Guard da acceso
        if(!roles) {
            return true;
        }

        // Extrae el rol del request y si esta incluido en el listado de roles exigidos el Guard da acceso
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return roles.includes(user.role);
    }
}