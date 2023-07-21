import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guard que verifica que las credenciales de inicio de sesión de un usuario sean válidas
 * Usa la estrategia {@link LocalStrategy}
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}