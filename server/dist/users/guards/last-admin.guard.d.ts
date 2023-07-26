import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users.service';
export declare class LastAdminGuard implements CanActivate {
    private readonly usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
