import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '../users/models/user.entity';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';

/**
 * Controlador del modulo AuthModule
 */
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    /**
     * Endpoint para registro/creacion de usuario
     * @param {CreateUserDto} dto - Data transfer object para la creación de un usuario 
     * @returns {UserEntity} - Usuario creado
     */
    @Post('signup')
    async signup(@Body() dto: CreateUserDto){
        return new UserEntity(await this.authService.signup(dto));
    }

    /**
     * Endpoint para cierre se sesión
     * Protegido por @Guard JwtAccessGuard
     * @param req
     */
    @UseGuards(JwtAccessGuard)
    @Get('logout')
    logout(@Request() req) {
        this.authService.logout(req.user.email);
    }

    /**
     * Endpoint para inicio de sesion de usuario
     * Protegido por @Guard LocalAuthGuard
     * @param req 
     * @returns 
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    /**
     * Endpoint para actualización de tokens
     * Protegido por @Guard JwtRefreshGuard
     * @param req 
     * @returns 
     */
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    refreshTokens(@Request() req) {
        return this.authService.refreshTokens(req.user.email, req.user.refreshToken);
    }
}
