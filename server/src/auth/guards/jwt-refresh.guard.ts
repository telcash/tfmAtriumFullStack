import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard que verifica que el request tiene un refresh jwt válido
 * Usa la estrategia JwtRefreshStrategy
 */
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}