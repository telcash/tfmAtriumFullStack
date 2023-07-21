import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard que verifica que el request de la petición contenga un JSON Web Token de acceso válido
 * Usa la estrategia {@link JwtAccessStrategy}
 */
@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt') {}