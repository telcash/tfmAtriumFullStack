import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard que verifica que las credenciales de login sean válidas
 * Usa la estrategia LocalStrategy
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}