import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard que verifica que el request tiene un JSON Web Token de actualización válido
 * Usa la estrategia {@link JwtRefreshStrategy}
 */
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super()
    }
}