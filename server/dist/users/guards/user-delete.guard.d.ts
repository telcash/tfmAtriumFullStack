import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users.service';
import { AuthService } from 'src/auth/auth.service';
export declare class UserDeleteGuard implements CanActivate {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
