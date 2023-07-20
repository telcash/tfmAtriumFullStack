import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador para extraer los datos de usuario de request.user
 * Extrae datos sólo si estos han sido asignados antes por un
 * middleware, guard o interceptor
 */
export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return data ? user?.[data] : user
    },
);
