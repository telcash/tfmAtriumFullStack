import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService, JwtTokens } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { SignupPipe } from './pipes/signup/signup.pipe';

/**
 * Controlador del modulo AuthModule
 */
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    /**
     * Endpoint para registro de usuario tipo CLIENT (signup)
     * @param {CreateUserDto} createUserDto - DTO para la creación de usuario 
     * @returns {UserEntity} - Usuario creado
     */
    @Post('signup')
    async signup(@Body(SignupPipe) createUserDto: CreateUserDto): Promise<UserEntity>{
        return new UserEntity(await this.authService.signup(createUserDto));
    }

    /**
     * Endpoint para inicio de sesion de usuario
     * Protegido por LocalAuthGuard
     * @param req 
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<JwtTokens> {
        return await this.authService.login(req.user);
    }
    
    /**
     * Endpoint para cierre se sesión
     * Protegido por JwtAccessGuard
     * @param req
     * @returns {UserEntity} - Usuario que cierra sesión
     */
    @UseGuards(JwtAccessGuard)
    @Get('logout')
    async logout(@Request() req): Promise<UserEntity> {
        return new UserEntity(await this.authService.logout(req.user.email));
    }


    /**
     * Endpoint para actualización de password de usuario
     * Protegido por JwtAccessGuard
     * @param req 
     * @param {UpdatePasswordDto} updatePasswordDto - Dto para actualización de password.
     * @returns {UserEntity} - Usuario actualizado
     */
    @UseGuards(JwtAccessGuard)
    @Patch('password')
    async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto): Promise<UserEntity> {
        return new UserEntity (await this.authService.updatePassword(req.user.email, updatePasswordDto));
    }

    /**
     * Endpoint para actualización de tokens
     * Protegido por JwtRefreshGuard
     * @param req 
     * @returns {JwtTokens} - accessToken y refreshToken
     */
    @UseGuards(JwtRefreshGuard)
    @Get('refresh')
    async refreshTokens(@Request() req): Promise<JwtTokens> {
        return await this.authService.refreshTokens(req.user.email, req.user.refreshToken);
    }
}
