import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserEntity } from '../users/entities/user.entity';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';

/**
 * Controlador del modulo AuthModule
 */
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    /**
     * Endpoint para registro/creacion de usuario
     * @param {CreateUserDto} createUserDto - Data transfer object para la creación de un usuario 
     * @returns {UserEntity} - Usuario creado
     */
    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<UserEntity>{
        return new UserEntity(await this.authService.signup(createUserDto));
    }

    /**
     * Endpoint para cierre se sesión
     * Protegido por JwtAccessGuard
     * @param req
     */
    @UseGuards(JwtAccessGuard)
    @Get('logout')
    async logout(@Request() req) {
        await this.authService.logout(req.user.email);
    }

    /**
     * Endpoint para inicio de sesion de usuario
     * Protegido por LocalAuthGuard
     * @param req 
     * @returns 
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<{accessToken: string, refreshToken: string}> {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtAccessGuard)
    @Patch('password')
    async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
        return await this.authService.updatePassword(req.user.email, updatePasswordDto);
    }

    /**
     * Endpoint para actualización de tokens
     * Protegido por JwtRefreshGuard
     * @param req 
     * @returns 
     */
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refreshTokens(@Request() req) {
        return await this.authService.refreshTokens(req.user.email, req.user.refreshToken);
    }
}
