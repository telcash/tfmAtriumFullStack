import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserIsAdminInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer','').trim() : null;
    
    req.isAdmin = false;

    if (token) {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    })
    .then((response) => {
      req.isAdmin = response.role === Role.ADMIN ? true : false
    })
    .catch(() => {
      req.isAdmin = false;
    })
    } else {
      req.isAdmin = false;
    }

    return next.handle();
  }
}
