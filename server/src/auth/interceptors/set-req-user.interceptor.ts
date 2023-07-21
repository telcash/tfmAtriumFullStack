import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Verifica si en el request de la petición hay un Json Web Token
 * Si hay un token, y es válido, extrae el payload del token con la información de usuario y lo anexa al request
 * Si hay un token invalido lanza un Unauthorized Exception
 */
@Injectable()
export class SetRequestUserInterceptor implements NestInterceptor {

  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  /**
   * Implementación del método intercept del interceptor
   * @param context - Contexto de ejecución
   * @param next - Objeto para hacer el llamado al siguiente handler de la solicitud
   * @returns - Llamada al siguiente handler de la solicitud
   */
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {

    // Extrae el request de la solicitud 
    const req = context.switchToHttp().getRequest();

    // Obtiene el bearer token del request si existe uno
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer','').trim() : null;
    
    // Si existe un token se verifica si es válido
    if (token) {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      })
      // Si el token es válido anexamos el payload con la información del usuario al request
      .then((payload) => {
        req.user = payload;
      })
      // Si el token no es válido lanzamos un Unauthorized Exception
      .catch(() => {
        throw new UnauthorizedException;
      })
    } 

    return next.handle();
  }
}
