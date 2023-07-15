import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserIsAdminInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    req.isAdmin = false;
    if (await this.authService.validateRefreshToken(req) && req.user.role === Role.ADMIN) {
      req.isAdmin = true;
    }
    return next.handle();
  }
}
