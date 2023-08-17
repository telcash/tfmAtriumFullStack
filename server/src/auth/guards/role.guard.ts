import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

/**
 * Guard que verifica que el usuario tiene un rol válido para acceder al endpoint.
 * Los roles válidos se establecen en el endpoint con el decorador {@link @Roles}
 * Compara los roles del decorador con el rol extraido del request
 * Antes se debe aplicar {@link JwtAccessGuard} para verificar que el request viene de un usuario autenticado
 * {@link JwtAccessGuard} agrega el rol del usuario al request
 */
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    /**
     * Implementación del método canActivate del Guard
     * @param {ExecutionContext} context - Contexto de ejecución
     * @returns {boolean} - True si el rol del usuario está entre los roles exigidos
     */
    canActivate(context: ExecutionContext): boolean {
        // Extrae el listado roles exigidos en el decorador @Role del endpoint
        const roles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
        
        // Si no hay rol exigido el Guard da acceso
        if(!roles) {
            return true;
        }
        
        // Extrae el rol del usuario del request y si esta incluido en el listado de roles exigidos el Guard da acceso
        // El rol se encuantra en user agregado al request por JwtAccessGuard 
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (roles.includes(user.role)) {
            return true
        }
        throw new ForbiddenException('Resource not allowed');
    }
}