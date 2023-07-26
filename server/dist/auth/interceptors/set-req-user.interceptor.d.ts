import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class SetRequestUserInterceptor implements NestInterceptor {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
