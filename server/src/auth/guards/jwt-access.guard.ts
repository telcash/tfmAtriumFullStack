import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard que verifica que el request contenga un Jwt de acceso válido
 * Usa la estrategia JwtAccessStrategy
 */
@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt') {}