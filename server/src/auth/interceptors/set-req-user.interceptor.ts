import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Verifica si en el request hay un token de acceso válido
 * Si lo hay, extrae el payload y lo anexa a la request
 */
@Injectable()
export class SetRequestUserInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // Extrae el request
    const req = context.switchToHttp().getRequest();

    // Obtiene el bearer token del request si hay uno
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer','').trim() : null;
    
    // Si hay token se verifica si es válido
    if (token) {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      })
      // Si el token es válido anexamos el payload al request
      .then((payload) => {
        req.user = payload;
      })
      // Si no es válido lanzamos un Unauthorized Exception
      .catch(() => {
        throw new UnauthorizedException;
      })
    } 

    return next.handle();
  }
}
